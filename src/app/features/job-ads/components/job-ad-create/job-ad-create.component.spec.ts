import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { jobAdsActions } from '../../store/job-ads.actions';
import { JobAdFormValues } from '../job-ad-form/job-ad-form.component';
import { JobAdCreateComponent } from './job-ad-create.component';

describe('JobAdCreateComponent', () => {
  let component: JobAdCreateComponent;
  let fixture: ComponentFixture<JobAdCreateComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockActions$: BehaviorSubject<any>;
  let mockBottomSheet: jasmine.SpyObj<MatBottomSheet>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockActions$ = new BehaviorSubject({});
    mockBottomSheet = jasmine.createSpyObj('MatBottomSheet', ['dismiss']);

    await TestBed.configureTestingModule({
      imports: [JobAdCreateComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Actions, useValue: mockActions$ },
        { provide: MatBottomSheet, useValue: mockBottomSheet },
      ],
    }).compileComponents();

    mockStore.select.and.returnValue(of(false)); // Mock loading state

    fixture = TestBed.createComponent(JobAdCreateComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select job ad create loading state from store', (done) => {
    component.createJobLoading$.subscribe((loading) => {
      expect(loading).toBe(false);
      expect(mockStore.select).toHaveBeenCalled();
      done();
    });
  });

  it('should dismiss bottom sheet on cancel', () => {
    component.onCancel();
    expect(mockBottomSheet.dismiss).toHaveBeenCalled();
  });

  it('should dispatch create job ad action and dismiss bottom sheet on success', fakeAsync(() => {
    const formValues: JobAdFormValues = {
      title: 'Test Job',
      description: 'Test Description',
      skills: ['Skill 1', 'Skill 2'],
    };

    component.onCreate(formValues);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      jobAdsActions.createJobAd({ jobAd: formValues })
    );

    mockActions$.next(
      jobAdsActions.createJobAdSuccess({ jobAd: formValues as any })
    );

    tick();

    expect(mockBottomSheet.dismiss).toHaveBeenCalled();
  }));
});
