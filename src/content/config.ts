import { defineCollection, z } from 'astro:content';

const home = defineCollection({
  type: 'content',
  schema: z.object({
    locale: z.enum(['en', 'zh']),
    hero: z.object({
      greeting: z.string(),
      paragraphs: z.array(z.string())
    })
  })
});

export const collections = { home };
