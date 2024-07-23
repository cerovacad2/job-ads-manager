export interface JobAd {
  id: string;
  title: string;
  description: string;
  skills: string[];
  status: JobAdStatus;
}

export type JobAdStatus = 'draft' | 'published' | 'archived';
