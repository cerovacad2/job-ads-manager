import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { JobAd, JobAdStatus } from '../models/job-ad.model';
import { JobAdFormValues } from '../components/job-ad-form/job-ad-form.component';

export const jobAdsActions = createActionGroup({
  source: 'jobs',
  events: {
    'Load Job Ads': emptyProps(),
    'Load Job Ads Success': props<{ jobAds: JobAd[] }>(),
    'Load Job Ads Failure': props<{ error: any }>(),
    'Create Job Ad': props<{ jobAd: JobAdFormValues }>(),
    'Create Job Ad Success': props<{ jobAd: JobAd }>(),
    'Create Job Ad Failure': props<{ error: any }>(),
    'Update Job Ad': props<{ jobAdId: string; jobAd: JobAdFormValues }>(),
    'Update Job Ad Success': props<{ jobAd: JobAd }>(),
    'Update Job Ad Failure': props<{ error: any }>(),
    'Update Job Ad Status': props<{ jobAdId: string; status: JobAdStatus }>(),
    'Update Job Ad Status Success': props<{ jobAd: JobAd }>(),
    'Update Job Ad Status Failure': props<{ error: any }>(),
    'Delete Job Ad': props<{ jobAdId: string }>(),
    'Delete Job Ad Success': props<{ jobId: string }>(),
    'Delete Job Ad Failure': props<{ error: any }>(),
  },
});
