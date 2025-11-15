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

const blog = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      title: z.string(),
      link: z.string().url(),
      pubDate: z.string().nullable(),
      description: z.string()
    })
  )
});

export const collections = { home, blog };
