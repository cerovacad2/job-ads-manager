import { Component, Input } from '@angular/core';
import { JobAd } from '../../models/job-ad.model';
import { JobAdItemComponent } from '../job-ad-item/job-ad-item.component';

@Component({
  selector: 'app-job-ads-list',
  standalone: true,
  imports: [JobAdItemComponent],
  templateUrl: './job-ads-list.component.html',
  styleUrl: './job-ads-list.component.scss'
})
export class JobAdsListComponent {
  @Input() jobAds: JobAd[] = [];
}
