import { Component, inject, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { JobAd } from '../../models/job-ad.model';
import { jobAdsActions } from '../../store/job-ads.actions';
import { JobAdItemViewModel } from './job-ad-item.view-model';

@Component({
  selector: 'app-job-ad-item',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatIconModule, MatButtonModule],
  templateUrl: './job-ad-item.component.html',
  styleUrl: './job-ad-item.component.scss',
  providers: [JobAdItemComponent],
})
export class JobAdItemComponent {
  @Input({ required: true })
  set jobAd(val: JobAd) {
    this._jobAd = new JobAdItemViewModel(val);
  }

  _jobAd!: JobAdItemViewModel;

  store = inject(Store);
  botomSheet = inject(MatBottomSheet);

  onPublish() {
    this.store.dispatch(
      jobAdsActions.updateJobAdStatus({
        jobAdId: this.jobAd.id,
        status: 'published',
      })
    );
  }

  onArchive() {
    this.store.dispatch(
      jobAdsActions.updateJobAdStatus({
        jobAdId: this.jobAd.id,
        status: 'archived',
      })
    );
  }

  onDelete() {
    this.store.dispatch(jobAdsActions.deleteJobAd({ jobAdId: this.jobAd.id }));
  }

  onEdit() {}
}
