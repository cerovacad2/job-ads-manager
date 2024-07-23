import { Component } from '@angular/core';
import { JobAdsContainerComponent } from '../../../job-ads/components/job-ads-container/job-ads-container.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JobAdsContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
