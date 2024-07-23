import { Component, inject, OnInit } from '@angular/core';
import { JobAdsService } from '../../services/job-ads-service.service';

@Component({
  selector: 'app-job-ads-container',
  standalone: true,
  imports: [],
  templateUrl: './job-ads-container.component.html',
  styleUrl: './job-ads-container.component.scss',
})
export class JobAdsContainerComponent implements OnInit {
  private jobAdsService = inject(JobAdsService);

  ngOnInit(): void {
    this.jobAdsService.getJobs().subscribe((ads) => console.log(ads));
  }
}
