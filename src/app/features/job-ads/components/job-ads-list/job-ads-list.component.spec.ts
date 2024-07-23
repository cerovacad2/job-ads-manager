import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdsListComponent } from './job-ads-list.component';

describe('JobAdsListComponent', () => {
  let component: JobAdsListComponent;
  let fixture: ComponentFixture<JobAdsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAdsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
