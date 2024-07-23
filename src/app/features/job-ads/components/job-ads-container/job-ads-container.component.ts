import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar.component';
import { JobAd } from '../../models/job.model';
import { JobAdsService } from '../../services/job-ads-service.service';
import {
  JobAdsFilter,
  JobAdsFilterComponent,
} from '../job-ads-filter/job-ads-filter.component';
import { JobAdsListComponent } from '../job-ads-list/job-ads-list.component';
@Component({
  selector: 'app-job-ads-container',
  standalone: true,
  imports: [
    JobAdsFilterComponent,
    ProgressBarComponent,
    MatButtonModule,
    JobAdsListComponent,
  ],
  templateUrl: './job-ads-container.component.html',
  styleUrl: './job-ads-container.component.scss',
})
export class JobAdsContainerComponent implements OnInit {
  private jobAdsService = inject(JobAdsService);

  jobAds: JobAd[] = [];

  ngOnInit(): void {
    this.jobAdsService.getJobs().subscribe((ads) => {
      this.jobAds = ads;
    });
  }

  onCreate() {}

  onFilterChanged(filter: JobAdsFilter) {
    console.log(filter);
  }
}
