import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { JobAdViewModel } from '../../models/job-ad.view-model';
import { JobAdItemComponent } from '../job-ad-item/job-ad-item.component';
import { JobAdsListComponent } from './job-ads-list.component';

describe('JobAdsListComponent', () => {
  let component: JobAdsListComponent;
  let fixture: ComponentFixture<JobAdsListComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAdsListComponent, JobAdItemComponent],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(JobAdsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display job ads when jobAds input is not empty', () => {
    const mockJobAds: JobAdViewModel[] = [
      new JobAdViewModel({
        title: 'title',
        description: 'desc',
        id: '123',
        skills: ['qwe', 'asd'],
        status: 'draft',
      }),
    ];
    component.jobAds = mockJobAds;
    fixture.detectChanges();

    const jobAdItems = fixture.debugElement.queryAll(
      By.directive(JobAdItemComponent)
    );
    expect(jobAdItems.length).toBe(1);
  });

  it('should display "No jobs found" message when jobAds input is empty', () => {
    component.jobAds = [];
    fixture.detectChanges();

    const noJobsMessage = fixture.debugElement.query(
      By.css('.job-ads-list-container')
    );
    expect(noJobsMessage).toBeNull();

    const messageElement = fixture.nativeElement.querySelector('p');
    expect(messageElement.textContent).toContain('No jobs found');
  });

  it('should render JobAdItemComponent when jobAds are provided', (done) => {
    try {
      const mockJobAd = new JobAdViewModel({
        title: 'Test Job',
        description: 'Test Description',
        id: '123',
        skills: ['skill1', 'skill2'],
        status: 'draft',
      });

      component.jobAds = [mockJobAd];
      fixture.detectChanges();

      const jobAdItems = fixture.debugElement.queryAll(
        By.directive(JobAdItemComponent)
      );

      expect(jobAdItems.length).toBe(1);

      if (jobAdItems.length > 0) {
        const jobAdItemComponent = jobAdItems[0].componentInstance;
        expect(jobAdItemComponent.jobAd).toEqual(mockJobAd);
      }

      done();
    } catch (error) {
      console.error('Error in test:', error);
      done.fail(JSON.stringify(error));
    }
  });
});
