import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { JobAd, JobAdStatus } from '../models/job.model';

export const jobAdsActions = createActionGroup({
  source: 'jobs',
  events: {
    'Load Job Ads': emptyProps(),
    'Load Job Ads Success': props<{ jobs: JobAd[] }>(),
    'Load Job Ads Failure': props<{ error: any }>(),
    'Create Job Ad': props<{ job: JobAd }>(),
    'Create Job Ad Success': props<{ job: JobAd }>(),
    'Create Job Ad Failure': props<{ error: any }>(),
    'Update Job Ad': props<{ jobId: string; job: JobAd }>(),
    'Update Job Ad Success': props<{ job: JobAd }>(),
    'Update Job Ad Failure': props<{ error: any }>(),
    'Update Job Ad Status': props<{ jobId: string; status: JobAdStatus }>(),
    'Update Job Ad Status Success': props<{ job: JobAd }>(),
    'Update Job Ad Status Failure': props<{ error: any }>(),
    'Delete Job Ad': props<{ jobId: string }>(),
    'Delete Job Ad Success': props<{ jobId: string }>(),
    'Delete Job Ad Failure': props<{ error: any }>(),
  },
});
