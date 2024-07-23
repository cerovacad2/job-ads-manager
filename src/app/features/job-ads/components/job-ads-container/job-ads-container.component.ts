import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar.component';
import {
  JobAdsFilter,
  JobAdsFilterComponent,
} from '../job-ads-filter/job-ads-filter.component';
import { JobAdsListComponent } from '../job-ads-list/job-ads-list.component';
import { JobAdContainerStore } from './job-ads-continer.store';
@Component({
  selector: 'app-job-ads-container',
  standalone: true,
  imports: [
    JobAdsFilterComponent,
    ProgressBarComponent,
    MatButtonModule,
    JobAdsListComponent,
    AsyncPipe,
  ],
  templateUrl: './job-ads-container.component.html',
  styleUrl: './job-ads-container.component.scss',
  providers: [JobAdContainerStore],
})
export class JobAdsContainerComponent implements OnInit {
  private componentStore = inject(JobAdContainerStore);

  readonly vm$ = this.componentStore.vm$;

  ngOnInit(): void {
    this.componentStore.loadJobs();
  }

  onFilterChanged(filters: JobAdsFilter) {
    this.componentStore.setFilterCriteria(filters);
  }

  onCreate() {}
}
