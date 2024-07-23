import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdEditComponent } from './job-ad-edit.component';

describe('JobAdEditComponent', () => {
  let component: JobAdEditComponent;
  let fixture: ComponentFixture<JobAdEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAdEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
