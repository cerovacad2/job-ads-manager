import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
} from '@angular/material/bottom-sheet';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { JobAdViewModel } from '../../models/job-ad.view-model';
import { jobAdsActions } from '../../store/job-ads.actions';
import { selectJobAdUpdateLoading } from '../../store/job-ads.reducer';
import {
  JobAdFormComponent,
  JobAdFormValues,
} from '../job-ad-form/job-ad-form.component';

@Component({
  selector: 'app-job-ad-edit',
  standalone: true,
  imports: [JobAdFormComponent],
  templateUrl: './job-ad-edit.component.html',
  styleUrl: './job-ad-edit.component.scss',
})
export class JobAdEditComponent {
  private destroyRef = inject(DestroyRef);
  private bottomSheet = inject(MatBottomSheet);
  private store = inject(Store);
  private actions$ = inject(Actions);
  public data: JobAdViewModel = inject(MAT_BOTTOM_SHEET_DATA);

  readonly editJobLoading$ = this.store.select(selectJobAdUpdateLoading);

  onCancel() {
    this.bottomSheet.dismiss();
  }

  onEdit(formValues: JobAdFormValues) {
    this.store.dispatch(
      jobAdsActions.updateJobAd({ jobAdId: this.data.id, jobAd: formValues })
    );

    this.actions$
      .pipe(
        ofType(jobAdsActions.updateJobAdSuccess),
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.bottomSheet.dismiss())
      )
      .subscribe();
  }
}
