export interface Project {
  id: string;
  name: string;
  description: {
    en: string;
    zh: string;
  };
  tags: string[];
  url: string;
  github?: string;
  stars?: number;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    "id": "surge-geosite-enhance",
    "name": "Surge Geosite Enhance",
    "description": {
      "en": "A Cloudflare Workers-based service that converts Loyalsoldier's geosite/geoip datasets into Surge-compatible plain text rulesets on demand. Features JSON indexing, SRS packaging, and a frontend browser for quick retrieval, preview, and search.",
      "zh": "一个基于 Cloudflare Workers 的服务，按需将 Loyalsoldier 提供的 geosite/geoip 数据集转换为适配 Surge 的纯文本规则集。提供 JSON 索引与 SRS 打包文件，同时提供前端浏览器用于快速检索、预览与搜索。"
    },
    "tags": [
      "Cloudflare Workers",
      "TypeScript",
      "Surge",
      "Geosite",
      "Network Rules"
    ],
    "url": "https://geo.sleepstars.de",
    "github": "https://github.com/Sleepstars/Surge-Geosite-Enhance",
    "stars": 6,
    "featured": true
  }
];
