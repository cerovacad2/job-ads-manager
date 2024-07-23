import { Component, Input } from '@angular/core';
import { JobAdItemComponent } from '../job-ad-item/job-ad-item.component';
import { JobAdViewModel } from '../../models/job-ad.view-model';

@Component({
  selector: 'app-job-ads-list',
  standalone: true,
  imports: [JobAdItemComponent],
  templateUrl: './job-ads-list.component.html',
  styleUrl: './job-ads-list.component.scss',
})
export class JobAdsListComponent {
  @Input() jobAds: JobAdViewModel[] = [];
}
