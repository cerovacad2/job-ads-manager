import { Component, DestroyRef, inject } from '@angular/core';
import { JobAdFormComponent, JobAdFormValues } from '../job-ad-form/job-ad-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Actions, ofType } from '@ngrx/effects';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { selectJobAdCreateLoading } from '../../store/job-ads.reducer';
import { jobAdsActions } from '../../store/job-ads.actions';

@Component({
  selector: 'app-job-ad-create',
  standalone: true,
  imports: [JobAdFormComponent],
  templateUrl: './job-ad-create.component.html',
  styleUrl: './job-ad-create.component.scss'
})
export class JobAdCreateComponent {
  private destroyRef = inject(DestroyRef);
  private bottomSheet = inject(MatBottomSheet);
  private store = inject(Store);
  private actions$ = inject(Actions);

  readonly createJobLoading$ = this.store.select(selectJobAdCreateLoading);

  onCancel() {
    this.bottomSheet.dismiss();
  }

  onCreate(formValues: JobAdFormValues) {
    this.store.dispatch(jobAdsActions.createJobAd({ jobAd: formValues }));

    this.actions$
      .pipe(
        ofType(jobAdsActions.createJobAdSuccess),
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.bottomSheet.dismiss())
      )
      .subscribe();
  }
}