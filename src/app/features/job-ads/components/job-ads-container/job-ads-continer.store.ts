import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { JobAdViewModel } from '../../models/job-ad.view-model';
import { jobAdsActions } from '../../store/job-ads.actions';
import {
  selectJobAdsLoading,
  selectJobAdViewModels,
} from '../../store/job-ads.reducer';
import { JobAdsFilter } from '../job-ads-filter/job-ads-filter.component';

interface JobAdsContainerState {
  filterCriteria: JobAdsFilter;
  jobs: JobAdViewModel[];
}

@Injectable()
export class JobAdContainerStore extends ComponentStore<JobAdsContainerState> {
  private store = inject(Store);

  private readonly filteredJobs$: Observable<JobAdViewModel[]> = combineLatest([
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
        this.store.select(selectJobAdViewModels).pipe(
          tap((jobs) => {
            this.patchState({
              jobs: jobs.map((job) => job),
            });
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

  private applyFilter(
    jobs: JobAdViewModel[],
    filterCriteria: JobAdsFilter
  ): JobAdViewModel[] {
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
