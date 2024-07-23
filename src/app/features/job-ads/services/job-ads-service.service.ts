import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { generateRandomId } from '../../../shared/utils/utils';
import { JobAd, JobAdDto, JobAdStatus } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobAdsService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.rootUrl}${environment.jobsEndpoint}`;

  getJobs(): Observable<JobAdDto[]> {
    return this.http.get<JobAdDto[]>(this.apiUrl).pipe(delay(1000));
  }

  createJob(data: JobAd): Observable<JobAd> {
    return this.http
      .post<JobAdDto>(this.apiUrl, {
        ...data,
        id: generateRandomId(),
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .pipe(delay(1000));
  }

  updateJob(data: { jobId: string; job: JobAd }): Observable<JobAdDto> {
    return this.http
      .patch<JobAdDto>(`${this.apiUrl}/${data.jobId}`, {
        ...data.job,
        updatedAt: new Date().toISOString(),
      })
      .pipe(delay(1000));
  }

  updateJobStatus(data: {
    jobId: string;
    status: JobAdStatus;
  }): Observable<JobAdDto> {
    return this.http.patch<JobAdDto>(`${this.apiUrl}/${data.jobId}`, {
      status: data.status,
      updatedAt: new Date().toISOString(),
    });
  }

  deleteJob(data: { jobId: string }): Observable<string> {
    return this.http
      .delete<JobAdDto>(`${this.apiUrl}/${data.jobId}`)
      .pipe(map((job) => job.id));
  }
}
