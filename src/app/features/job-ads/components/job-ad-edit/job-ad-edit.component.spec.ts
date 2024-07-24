import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
} from '@angular/material/bottom-sheet';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { JobAd } from '../../models/job-ad.model';
import { JobAdViewModel } from '../../models/job-ad.view-model';
import { jobAdsActions } from '../../store/job-ads.actions';
import { JobAdFormValues } from '../job-ad-form/job-ad-form.component';
import { JobAdEditComponent } from './job-ad-edit.component';

describe('JobAdEditComponent', () => {
  let component: JobAdEditComponent;
  let fixture: ComponentFixture<JobAdEditComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockActions$: BehaviorSubject<any>;
  let mockBottomSheet: jasmine.SpyObj<MatBottomSheet>;
  let mockJobAd: JobAdViewModel;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockActions$ = new BehaviorSubject({});
    mockBottomSheet = jasmine.createSpyObj('MatBottomSheet', ['dismiss']);
    mockJobAd = new JobAdViewModel({
      id: '123',
      title: 'Test Job',
      description: 'Test Description',
      skills: ['Skill 1', 'Skill 2'],
      status: 'draft',
    });

    await TestBed.configureTestingModule({
      imports: [JobAdEditComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Actions, useValue: mockActions$ },
        { provide: MatBottomSheet, useValue: mockBottomSheet },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: mockJobAd },
      ],
      schemas: [NO_ERRORS_SCHEMA], // To ignore unknown elements like app-job-ad-form
    }).compileComponents();

    mockStore.select.and.returnValue(of(false)); // Mock loading state

    fixture = TestBed.createComponent(JobAdEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with job ad data', () => {
    expect(component.data).toEqual(mockJobAd);
  });

  it('should select job ad update loading state from store', (done) => {
    component.editJobLoading$.subscribe((loading) => {
      expect(loading).toBe(false);
      expect(mockStore.select).toHaveBeenCalled();
      done();
    });
  });

  it('should dismiss bottom sheet on cancel', () => {
    component.onCancel();
    expect(mockBottomSheet.dismiss).toHaveBeenCalled();
  });

  it('should dispatch update job ad action and dismiss bottom sheet on success', fakeAsync(() => {
    const formValues: JobAdFormValues = {
      title: 'Updated Job',
      description: 'Updated Description',
      skills: ['Updated Skill 1', 'Updated Skill 2'],
    };

    component.onEdit(formValues);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      jobAdsActions.updateJobAd({ jobAdId: mockJobAd.id, jobAd: formValues })
    );

    mockActions$.next(
      jobAdsActions.updateJobAdSuccess({
        jobAd: { ...mockJobAd, ...formValues } as JobAd,
      })
    );

    tick();

    expect(mockBottomSheet.dismiss).toHaveBeenCalled();
  }));
});
