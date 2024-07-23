import { JobAd, JobAdStatus } from '../../models/job-ad.model';

export class JobAdItemViewModel {
  constructor(private jobAd: JobAd) {}

  get id(): string {
    return this.jobAd.id;
  }
  get title(): string {
    return this.jobAd.title;
  }
  get description(): string {
    return this.jobAd.description;
  }
  get skills(): string[] {
    return this.jobAd.skills;
  }
  get status(): JobAdStatus {
    return this.jobAd.status;
  }
  get statusLabel(): string {
    return this.getStatusLabel(this.jobAd.status);
  }
  get canPublish(): boolean {
    return this.jobAd.status === 'draft';
  }
  get canArchive(): boolean {
    return this.jobAd.status === 'draft' || this.jobAd.status === 'published';
  }
  get canEdit(): boolean {
    return this.jobAd.status !== 'archived';
  }

  private getStatusLabel(status: JobAdStatus | undefined): string {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'published':
        return 'Published';
      case 'archived':
        return 'Archived';
      default:
        return 'Unknown';
    }
  }
}
