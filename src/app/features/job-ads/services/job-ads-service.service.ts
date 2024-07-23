import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { JobAd } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobAdsService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.rootUrl}${environment.jobsEndpoint}`;

  getJobs(): Observable<JobAd[]> {
    return this.http.get<JobAd[]>(this.apiUrl).pipe(delay(1000));
  }
}
