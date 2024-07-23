import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { invoicesActions } from '../../invoices/store/invoices.actions';
import { JobAdsService } from '../services/job-ads/job-ads-service.service';
import { jobAdsActions } from './job-ads.actions';

@Injectable()
export class JobsEffects {
  private actions$ = inject(Actions);
  private jobAdsService = inject(JobAdsService);
  private snackbarService = inject(SnackbarService);

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

  createInvoiceOnJobPublish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobAdsActions.updateJobAdStatusSuccess),
      map(({ jobAd }) => jobAd),
      filter((jobAd) => jobAd.status === 'published'),
      map((job) =>
        invoicesActions.createInvoice({ invoice: { jobAdId: job.id } })
      )
    )
  );

  deleteInvoiceOnJobDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(jobAdsActions.deleteJobAdSuccess),
      map(({ jobId }) => invoicesActions.deleteInvoiceByJobId({ jobId }))
    )
  );

  handleErrors$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          jobAdsActions.loadJobAdsFailure,
          jobAdsActions.createJobAdFailure,
          jobAdsActions.updateJobAdFailure,
          jobAdsActions.updateJobAdStatusFailure,
          jobAdsActions.deleteJobAdFailure
        ),
        tap(({ error }) => {
          const errorMessage = error.message || 'Oops, something went wrong';
          this.snackbarService.showError(errorMessage);
        })
      ),
    { dispatch: false }
  );
}
