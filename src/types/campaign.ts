export type AgeRange = "18-25" | "12-16" | "16-18" | "18+";

export type FileType = "video" | "image";

export type Campaign = {
  id?: number;
  device?: number;
  name: string;
  file_url: string;
  emotions: string;
  age_range: AgeRange;
  brand: string;
  start_date: string;
  end_date: string;
};
export type GraphAdd = {
  campaign__name: string;
  campaign_id: number;
  view_count: number;
};
