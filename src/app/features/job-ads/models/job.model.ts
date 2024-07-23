export interface JobAd {
  id: string;
  title: string;
  description: string;
  skills: string[];
  status: JobAdStatus;
}

export interface JobAdDto extends JobAd {
  createdAt: Date;
  updatedAt: Date;
  _embedded: unknown;
}


export type JobAdStatus = 'draft' | 'published' | 'archived';
