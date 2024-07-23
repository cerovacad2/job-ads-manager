import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdCreateComponent } from './job-ad-create.component';

describe('JobAdCreateComponent', () => {
  let component: JobAdCreateComponent;
  let fixture: ComponentFixture<JobAdCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAdCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
