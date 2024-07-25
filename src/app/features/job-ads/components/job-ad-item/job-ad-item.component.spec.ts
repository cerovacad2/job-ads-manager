import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { JobAdViewModel } from '../../models/job-ad.view-model';
import { jobAdsActions } from '../../store/job-ads.actions';
import { JobAdEditComponent } from '../job-ad-edit/job-ad-edit.component';
import { JobAdItemComponent } from './job-ad-item.component';

describe('JobAdItemComponent', () => {
  let component: JobAdItemComponent;
  let fixture: ComponentFixture<JobAdItemComponent>;

  let mockStore: jasmine.SpyObj<Store>;
  let mockBottomSheet: jasmine.SpyObj<MatBottomSheet>;
  let mockJobAd: JobAdViewModel;
  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockBottomSheet = jasmine.createSpyObj('MatBottomSheet', ['open']);
    mockJobAd = new JobAdViewModel({
      id: '123',
      title: 'Test Job',
      description: 'Test Description',
      skills: ['Skill 1', 'Skill 2'],
      status: 'draft',
    });

    await TestBed.configureTestingModule({
      imports: [JobAdItemComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: MatBottomSheet, useValue: mockBottomSheet },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobAdItemComponent);
    component = fixture.componentInstance;
    component.jobAd = mockJobAd;
    fixture.detectChanges();
  });

  const getButtonByText = (text: string) =>
    fixture.debugElement
      .queryAll(By.css('button'))
      .find((button) => button.nativeElement.textContent.trim() === text);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title if JobAd passed', () => {
    const title = fixture.nativeElement.querySelector('h3');
    expect(title.textContent).toContain('Test Job');
  });

  it('should render description if JobAd passed', () => {
    const description = fixture.nativeElement.querySelector('p');
    expect(description.textContent).toContain('Description: Test Description');
  });

  it('it should render status if jobAd passed', () => {
    expect(fixture.nativeElement.textContent).toContain('Draft');
  });

  it('it should render skills if jobAd passed', () => {
    expect(fixture.nativeElement.textContent).toContain('Skill 1');
    expect(fixture.nativeElement.textContent).toContain('Skill 2');
  });

  it('should dispatch published status update on publish', () => {
    component.onPublish();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      jobAdsActions.updateJobAdStatus({
        jobAdId: mockJobAd.id,
        status: 'published',
      })
    );
  });

  it('should dispatch archived status update on archived', () => {
    component.onArchive();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      jobAdsActions.updateJobAdStatus({
        jobAdId: mockJobAd.id,
        status: 'archived',
      })
    );
  });

  it('should dispatch delete action on delete', () => {
    component.onDelete();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      jobAdsActions.deleteJobAd({
        jobAdId: mockJobAd.id,
      })
    );
  });

  it('should open bottom sheet on edit', () => {
    component.onEdit();
    expect(mockBottomSheet.open).toHaveBeenCalledWith(
      JobAdEditComponent as any,
      {
        data: mockJobAd,
      }
    );
  });

  it('should show/hide action buttons based on jobAd status', () => {
    expect(getButtonByText('Delete')).toBeTruthy();
    expect(getButtonByText('Edit')).toBeTruthy();
    expect(getButtonByText('Archive')).toBeTruthy();
    expect(getButtonByText('Publish')).toBeTruthy();

    component.jobAd = new JobAdViewModel({
      ...mockJobAd,
      status: 'published',
    } as JobAdViewModel);

    fixture.detectChanges();

    expect(getButtonByText('Delete')).toBeTruthy();
    expect(getButtonByText('Edit')).toBeFalsy();
    expect(getButtonByText('Archive')).toBeTruthy();
    expect(getButtonByText('Publish')).toBeFalsy();

    component.jobAd = new JobAdViewModel({
      ...mockJobAd,
      status: 'archived',
    } as JobAdViewModel);

    fixture.detectChanges();

    expect(getButtonByText('Delete')).toBeTruthy();
    expect(getButtonByText('Edit')).toBeFalsy();
    expect(getButtonByText('Archive')).toBeFalsy();
    expect(getButtonByText('Publish')).toBeFalsy();
  });

});
