import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EMPTY, map, Observable, startWith, tap } from 'rxjs';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar.component';
import { JobAd } from '../../models/job-ad.model';
import { JobAdValidatorsService } from '../../services/job-ad-validators.service';

export interface JobAdFormValues {
  title: string;
  description: string;
  skills: string[];
}
@Component({
  selector: 'app-job-ad-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatError,
    ProgressBarComponent,
  ],
  templateUrl: './job-ad-form.component.html',
  styleUrl: './job-ad-form.component.scss'
})
export class JobAdFormComponent {
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private jobAdValidators = inject(JobAdValidatorsService);

  @Input() loading$: Observable<boolean> = EMPTY;
  @Input() initialValues?: JobAd;

  @Output() submitted = new EventEmitter<JobAdFormValues>();
  @Output() canceled = new EventEmitter();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    skills: [[] as string[], [Validators.required]],
  });

  isFormValid$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => status === 'VALID')
  );

  ngOnInit(): void {
    this.trackIsFormDisabled();
    if (this.initialValues) {      
      this.patchInitialValues();
    } else {
      this.addUniqueTitleValidator();
    }
  }

  private trackIsFormDisabled(): void {
    this.loading$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((isLoading) =>
          isLoading ? this.form.disable() : this.form.enable()
        )
      )
      .subscribe();
  }

  private patchInitialValues(): void {
    this.form.patchValue({
      title: this.initialValues?.title,
      description: this.initialValues?.description,
      skills: this.initialValues?.skills
    });
  }

  private addUniqueTitleValidator(): void {
    this.form.controls.title?.addAsyncValidators(
      this.jobAdValidators.uniqueJobAdTitle()
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.value as JobAdFormValues);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.canceled.emit();
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.form.controls.skills.value?.includes(value)) {
      const currentSkills = this.form.controls.skills?.value || [];
      this.form.controls.skills.setValue([...currentSkills, value]);
    }
    event.chipInput!.clear();
  }

  removeSkill(skill: string): void {
    const currentSkills = this.form.controls.skills?.value || [];
    const index = currentSkills.indexOf(skill);
    if (index >= 0) {
      const updatedSkills = [...currentSkills];
      updatedSkills.splice(index, 1);
      this.form.controls.skills?.setValue(updatedSkills);
    }
  }
}