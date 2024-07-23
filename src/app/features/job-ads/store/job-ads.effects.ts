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
          map((jobs) => jobAdsActions.loadJobAdsSuccess({ jobs })),
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
      switchMap(({ job }) =>
        this.jobAdsService.createJob(job).pipe(
          map((createdJob) =>
            jobAdsActions.createJobAdSuccess({ job: createdJob })
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
      switchMap(({ jobId, job }) =>
        this.jobAdsService.updateJob({ jobId, job }).pipe(
          map((updatedJob) =>
            jobAdsActions.updateJobAdSuccess({ job: updatedJob })
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
      switchMap(({ jobId, status }) =>
        this.jobAdsService.updateJobStatus({ jobId, status }).pipe(
          map((updatedJob) =>
            jobAdsActions.updateJobAdStatusSuccess({ job: updatedJob })
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
      switchMap(({ jobId }) =>
        this.jobAdsService.deleteJob({ jobId }).pipe(
          map(() => jobAdsActions.deleteJobAdSuccess({ jobId })),
          catchError((error) =>
            of(jobAdsActions.deleteJobAdFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
