import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the current projects data
const projectsPath = join(__dirname, '../src/data/projects.ts');
let projectsContent = readFileSync(projectsPath, 'utf8');

// Extract the projects array
const projectsMatch = projectsContent.match(/export const projects: Project\[\] = (\[[\s\S]*?\]);/);
if (!projectsMatch) {
    console.error('Could not find projects array in projects.ts');
    process.exit(1);
}

let projects;
try {
    projects = eval(projectsMatch[1]);
} catch (error) {
    console.error('Error parsing projects array:', error);
    process.exit(1);
}

console.log('Updating GitHub stars for projects...');

let hasChanges = false;

for (const project of projects) {
    if (project.github) {
        try {
            // Extract owner/repo from GitHub URL
            const githubMatch = project.github.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/i);
            if (githubMatch) {
                const [, owner, repo] = githubMatch;
                const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

                console.log(`Fetching stars for ${owner}/${repo}...`);

                const headers = {
                    'User-Agent': 'update-stars-script',
                    'Accept': 'application/vnd.github.v3+json'
                };

                // Add authorization token if available (for higher rate limits)
                if (process.env.GITHUB_TOKEN) {
                    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
                }

                const response = await fetch(apiUrl, { headers });

                if (response.ok) {
                    const data = await response.json();
                    const newStars = data.stargazers_count || 0;

                    if (project.stars !== newStars) {
                        console.log(`Updating ${project.name}: ${project.stars} -> ${newStars} stars`);
                        project.stars = newStars;
                        hasChanges = true;
                    } else {
                        console.log(`${project.name}: ${newStars} stars (no change)`);
                    }
                } else {
                    console.error(`Failed to fetch stars for ${owner}/${repo}: ${response.status}`);
                }
            }
        } catch (error) {
            console.error(`Error updating stars for ${project.name}:`, error.message);
        }
    }
}

if (hasChanges) {
    // Update the projects array in the file
    const newProjectsArray = `export const projects: Project[] = ${JSON.stringify(projects, null, 2)};`;

    // Replace the old projects array with the new one
    const newContent = projectsContent.replace(
        /export const projects: Project\[\] = \[[\s\S]*?\];/,
        newProjectsArray
    );

    writeFileSync(projectsPath, newContent, 'utf8');
    console.log('Stars count updated successfully!');
} else {
    console.log('No changes needed.');
}