import { TestBed } from '@angular/core/testing';

import { JobAdValidatorsService } from './job-ad-validators.service';

describe('JobAdValidatorsService', () => {
  let service: JobAdValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobAdValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
