import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdsContainerComponent } from './job-ads-container.component';

describe('JobAdsContainerComponent', () => {
  let component: JobAdsContainerComponent;
  let fixture: ComponentFixture<JobAdsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAdsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
