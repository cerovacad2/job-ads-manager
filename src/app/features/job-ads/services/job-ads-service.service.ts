import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { generateRandomId } from '../../../shared/utils/utils';
import { JobAdFormValues } from '../components/job-ad-form/job-ad-form.component';
import { JobAd, JobAdDto, JobAdStatus } from '../models/job-ad.model';

@Injectable({
  providedIn: 'root',
})
export class JobAdsService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.rootUrl}${environment.jobAdsEndpoint}`;

  getJobs(): Observable<JobAdDto[]> {
    return this.http.get<JobAdDto[]>(this.apiUrl).pipe(delay(1000));
  }

  createJob(jobAd: JobAdFormValues): Observable<JobAd> {
    return this.http
      .post<JobAdDto>(this.apiUrl, {
        ...jobAd,
        id: generateRandomId(),
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .pipe(delay(1000));
  }

  updateJob(data: {
    jobAdId: string;
    jobAd: JobAdFormValues;
  }): Observable<JobAdDto> {
    return this.http
      .patch<JobAdDto>(`${this.apiUrl}/${data.jobAdId}`, {
        ...data.jobAd,
        updatedAt: new Date().toISOString(),
      })
      .pipe(delay(1000));
  }

  updateJobStatus(data: {
    jobAdId: string;
    status: JobAdStatus;
  }): Observable<JobAdDto> {
    return this.http.patch<JobAdDto>(`${this.apiUrl}/${data.jobAdId}`, {
      status: data.status,
      updatedAt: new Date().toISOString(),
    });
  }

  deleteJob(data: { jobAdId: string }): Observable<string> {
    return this.http
      .delete<JobAdDto>(`${this.apiUrl}/${data.jobAdId}`)
      .pipe(map((jobAd) => jobAd.id));
  }
}
