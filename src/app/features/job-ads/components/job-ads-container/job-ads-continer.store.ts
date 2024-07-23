import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { JobAd } from '../../models/job-ad.model';
import { jobAdsActions } from '../../store/job-ads.actions';
import { selectJobAds, selectJobAdsLoading } from '../../store/job-ads.reducer';
import { JobAdsFilter } from '../job-ads-filter/job-ads-filter.component';

interface JobAdsContainerState {
  filterCriteria: JobAdsFilter;
  jobs: JobAd[];
}

@Injectable()
export class JobAdContainerStore extends ComponentStore<JobAdsContainerState> {
  private store = inject(Store);

  private readonly filteredJobs$: Observable<JobAd[]> = combineLatest([
    this.select((state) => state.jobs),
    this.select((state) => state.filterCriteria),
  ]).pipe(map(([jobs, criteria]) => this.applyFilter(jobs, criteria)));

  readonly vm$ = combineLatest({
    filteredJobAds: this.filteredJobs$,
    JobAdsloading: this.store.select(selectJobAdsLoading),
  });

  constructor() {
    super({
      filterCriteria: { search: '', status: '' },
      jobs: [],
    });

    this.listenToJobsGlobalStore();
  }

  readonly listenToJobsGlobalStore = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.store.select(selectJobAds).pipe(
          tap((jobs) => {
            this.patchState({ jobs });
          })
        )
      )
    )
  );

  loadJobs() {
    this.store.dispatch(jobAdsActions.loadJobAds());
  }

  readonly setFilterCriteria = this.updater(
    (state, filterCriteria: JobAdsFilter) => ({
      ...state,
      filterCriteria,
    })
  );

  private applyFilter(jobs: JobAd[], filterCriteria: JobAdsFilter): JobAd[] {
    const { search, status } = filterCriteria;
    const lowerSearch = search.toLowerCase();
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(lowerSearch) ||
        job.description.toLowerCase().includes(lowerSearch) ||
        job.skills.some((skill) => skill.toLowerCase().includes(lowerSearch));
      return status ? matchesSearch && job.status === status : matchesSearch;
    });
  }
}
