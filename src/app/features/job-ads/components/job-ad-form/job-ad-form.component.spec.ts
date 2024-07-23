import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdFormComponent } from './job-ad-form.component';

describe('JobAdFormComponent', () => {
  let component: JobAdFormComponent;
  let fixture: ComponentFixture<JobAdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAdFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
