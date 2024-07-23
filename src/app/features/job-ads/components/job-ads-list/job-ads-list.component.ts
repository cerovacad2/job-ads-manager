import { Component, Input } from '@angular/core';
import { JobAd } from '../../models/job.model';

@Component({
  selector: 'app-job-ads-list',
  standalone: true,
  imports: [],
  templateUrl: './job-ads-list.component.html',
  styleUrl: './job-ads-list.component.scss'
})
export class JobAdsListComponent {
  @Input() jobAds: JobAd[] = [];
}
