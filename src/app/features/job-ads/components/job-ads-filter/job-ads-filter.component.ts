import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
} from 'rxjs';
import { AutofocusDirective } from '../../../../shared/directives/autofocus/autofocus.directive';
import { JobAdStatus } from '../../models/job-ad.model';

export interface JobAdsFilter {
  search: string;
  status: string;
}
interface JobAdStatusOption {
  value: JobAdStatus | '';
  viewValue: string;
}

@Component({
  selector: 'app-job-ads-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    AutofocusDirective,
  ],
  templateUrl: './job-ads-filter.component.html',
  styleUrl: './job-ads-filter.component.scss',
})
export class JobAdsFilterComponent {
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);

  @Output() filterChanged = new EventEmitter<JobAdsFilter>();

  statuses: JobAdStatusOption[] = [
    { value: '', viewValue: 'All' },
    { value: 'draft', viewValue: 'Draft' },
    { value: 'published', viewValue: 'Published' },
    { value: 'archived', viewValue: 'Archived' },
  ];

  filterForm = this.fb.nonNullable.group<JobAdsFilter>({
    search: '',
    status: '',
  });

  ngOnInit(): void {
    this.emitValuesOnFormChanges();
  }

  emitValuesOnFormChanges() {
    combineLatest({
      search: this.filterForm.controls.search.valueChanges.pipe(
        startWith(''),
        debounceTime(500)
      ),
      status: this.filterForm.controls.status.valueChanges.pipe(startWith('')),
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        tap((formValues) => this.filterChanged.emit(formValues as JobAdsFilter))
      )
      .subscribe();
  }
}
