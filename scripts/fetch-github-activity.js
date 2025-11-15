import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'Sleepstars';
const OUTPUT_FILE = path.join(__dirname, '../src/data/github-activity.json');

// 获取过去一年的贡献数据
async function fetchGitHubActivity() {
  try {
    console.log(`Fetching GitHub activity for ${GITHUB_USERNAME}...`);
    
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;
    
    const headers = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    // 如果有 token，添加到请求头
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }
    
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables: {
          username: GITHUB_USERNAME,
          from: oneYearAgo.toISOString(),
          to: today.toISOString()
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
    
    // 处理数据
    const activityData = {
      username: GITHUB_USERNAME,
      totalContributions: 0,
      weeks: []
    };
    
    let totalContributions = 0;
    
    weeks.forEach(week => {
      const weekData = {
        firstDay: week.contributionDays[0]?.date,
        days: []
      };
      
      week.contributionDays.forEach(day => {
        weekData.days.push({
          date: day.date,
          count: day.contributionCount,
          level: getContributionLevel(day.contributionLevel)
        });
        totalContributions += day.contributionCount;
      });
      
      activityData.weeks.push(weekData);
    });
    
    activityData.totalContributions = totalContributions;
    activityData.lastUpdated = new Date().toISOString();
    
    // 确保输出目录存在
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 写入JSON文件
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(activityData, null, 2));
    
    console.log(`✅ Successfully fetched GitHub activity data`);
    console.log(`Total contributions: ${totalContributions}`);
    console.log(`Data saved to: ${OUTPUT_FILE}`);
    
    return activityData;
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    process.exit(1);
  }
}

// 将GitHub的贡献等级转换为0-4的数字
function getContributionLevel(level) {
  switch (level) {
    case 'NONE': return 0;
    case 'FIRST_QUARTILE': return 1;
    case 'SECOND_QUARTILE': return 2;
    case 'THIRD_QUARTILE': return 3;
    case 'FOURTH_QUARTILE': return 4;
    default: return 0;
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchGitHubActivity();
}

export default fetchGitHubActivity;
