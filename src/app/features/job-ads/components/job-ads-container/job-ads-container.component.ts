import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar.component';
import { JobAdsService } from '../../services/job-ads-service.service';
import {
  JobAdsFilter,
  JobAdsFilterComponent,
} from '../job-ads-filter/job-ads-filter.component';

@Component({
  selector: 'app-job-ads-container',
  standalone: true,
  imports: [JobAdsFilterComponent, ProgressBarComponent, MatButtonModule],
  templateUrl: './job-ads-container.component.html',
  styleUrl: './job-ads-container.component.scss',
})
export class JobAdsContainerComponent implements OnInit {
  private jobAdsService = inject(JobAdsService);

  ngOnInit(): void {
    this.jobAdsService.getJobs().subscribe((ads) => console.log(ads));
  }

  onCreate() {}

  onFilterChanged(filter: JobAdsFilter) {
    console.log(filter);
  }
}
