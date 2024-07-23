import { Component } from '@angular/core';
import { JobAdsContainerComponent } from '../../../job-ads/components/job-ads-container/job-ads-container.component';
import { InvoicesContainerComponent } from '../../../invoices/components/invoices-container/invoices-container.component';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTabsModule, InvoicesContainerComponent, JobAdsContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
