export interface SiteConfig {
  name: string;
  startYear?: number;
  icp?: string; // 例如：粤ICP备12345678号-1
  /** 公安备案省份简称（如：粤、川、京、沪 等） */
  psbProvince?: string;
  /** 公安备案编号（纯数字） */
  psbNumber?: string;
}

export const site: SiteConfig = {
  name: 'Sleepstars',
  // 可选：若留空将只显示当前年份
  startYear: 2024,

  // 在此填写你的备案信息（留空则不会显示该项）
  icp: '粤 ICP 备 2024334859 号 - 1',
  // 使用下列两个字段分别填写省份简称与编号
  psbProvince: '粤',
  psbNumber: '44030002005186'
};
