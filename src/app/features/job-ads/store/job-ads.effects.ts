import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { JobAdsService } from '../services/job-ads-service.service';
import { jobAdsActions } from './job-ads.actions';

@Injectable()
export class JobsEffects {
  private actions$ = inject(Actions);
  private jobAdsService = inject(JobAdsService);

  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobAdsActions.loadJobAds),
      switchMap(() =>
        this.jobAdsService.getJobs().pipe(
          map((jobAds) => jobAdsActions.loadJobAdsSuccess({ jobAds })),
          catchError((error) =>
            of(jobAdsActions.loadJobAdsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobAdsActions.createJobAd),
      switchMap(({ jobAd }) =>
        this.jobAdsService.createJob(jobAd).pipe(
          map((createdJob) =>
            jobAdsActions.createJobAdSuccess({ jobAd: createdJob })
          ),
          catchError((error) =>
            of(jobAdsActions.createJobAdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobAdsActions.updateJobAd),
      switchMap(({ jobAdId, jobAd }) =>
        this.jobAdsService.updateJob({ jobAdId, jobAd }).pipe(
          map((updatedJob) =>
            jobAdsActions.updateJobAdSuccess({ jobAd: updatedJob })
          ),
          catchError((error) =>
            of(jobAdsActions.updateJobAdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateJobStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobAdsActions.updateJobAdStatus),
      switchMap(({ jobAdId, status }) =>
        this.jobAdsService.updateJobStatus({ jobAdId, status }).pipe(
          map((updatedJob) =>
            jobAdsActions.updateJobAdStatusSuccess({ jobAd: updatedJob })
          ),
          catchError((error) =>
            of(jobAdsActions.updateJobAdStatusFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobAdsActions.deleteJobAd),
      switchMap(({ jobAdId }) =>
        this.jobAdsService.deleteJob({ jobAdId }).pipe(
          map(() => jobAdsActions.deleteJobAdSuccess({ jobId: jobAdId })),
          catchError((error) =>
            of(jobAdsActions.deleteJobAdFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
