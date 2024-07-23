import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdsFilterComponent } from './job-ads-filter.component';

describe('JobAdsFilterComponent', () => {
  let component: JobAdsFilterComponent;
  let fixture: ComponentFixture<JobAdsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAdsFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
