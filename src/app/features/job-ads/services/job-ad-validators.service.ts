import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { selectJobAds } from '../store/job-ads.reducer';

@Injectable({
  providedIn: 'root',
})
export class JobAdValidatorsService {
  private store = inject(Store);

  uniqueJobAdTitle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.store.select(selectJobAds).pipe(
        take(1),
        map((jobs) => {
          const titleExists = jobs.some(
            (job) => job.title.toLowerCase() === control.value?.toLowerCase()
          );
          return titleExists ? { titleNotUnique: true } : null;
        })
      );
    };
  }
}
