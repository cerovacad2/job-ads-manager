import { createFeature, createReducer, on } from '@ngrx/store';
import { JobAd } from '../models/job-ad.model';
import { jobAdsActions } from './job-ads.actions';

export interface JobState {
  jobAds: JobAd[];
  jobAdsLoading: boolean;
  jobAdsError: any;
  jobAdCreateLoading: boolean;
  jobAdUpdateLoading: boolean;
  jobAdUpdateError: any;
  jobAdDeleteLoading: boolean;
  jobAdDeleteError: any;
}

export const initialState: JobState = {
  jobAds: [],
  jobAdsLoading: false,
  jobAdCreateLoading: false,
  jobAdsError: null,
  jobAdUpdateLoading: false,
  jobAdUpdateError: null,
  jobAdDeleteLoading: false,
  jobAdDeleteError: null,
};

export const jobsFeature = createFeature({
  name: 'jobs',
  reducer: createReducer(
    initialState,
    on(jobAdsActions.loadJobAds, (state) => ({
      ...state,
      jobAdsLoading: true,
    })),
    on(jobAdsActions.loadJobAdsSuccess, (state, { jobAds }) => ({
      ...state,
      jobAds,
      jobAdsLoading: false,
    })),
    on(jobAdsActions.loadJobAdsFailure, (state, { error }) => ({
      ...state,
      jobAdsError: error,
      jobAdsLoading: false,
    })),
    on(jobAdsActions.createJobAd, (state) => ({
      ...state,
      jobAdCreateLoading: true,
    })),
    on(jobAdsActions.createJobAdSuccess, (state, { jobAd }) => ({
      ...state,
      jobAds: [...state.jobAds, jobAd],
      jobAdCreateLoading: false,
    })),
    on(jobAdsActions.createJobAdFailure, (state, { error }) => ({
      ...state,
      jobAdsError: error,
      jobAdCreateLoading: false,
    })),
    on(jobAdsActions.updateJobAd, jobAdsActions.updateJobAdStatus, (state) => ({
      ...state,
      jobAdUpdateLoading: true,
    })),
    on(
      jobAdsActions.updateJobAdSuccess,
      jobAdsActions.updateJobAdStatusSuccess,
      (state, { jobAd }) => ({
        ...state,
        jobAds: state.jobAds.map((j) => (j.id === jobAd.id ? jobAd : j)),
        jobAdUpdateLoading: false,
      })
    ),
    on(
      jobAdsActions.updateJobAdFailure,
      jobAdsActions.updateJobAdStatusFailure,
      (state, { error }) => ({
        ...state,
        jobAdUpdateError: error,
        jobAdUpdateLoading: false,
      })
    ),
    on(jobAdsActions.deleteJobAd, (state) => ({
      ...state,
      jobAdDeleteLoading: true,
    })),
    on(jobAdsActions.deleteJobAdSuccess, (state, { jobId }) => ({
      ...state,
      jobAds: state.jobAds.filter((job) => job.id !== jobId),
      jobAdDeleteLoading: false,
    })),
    on(jobAdsActions.deleteJobAdFailure, (state, { error }) => ({
      ...state,
      jobAdDeleteError: error,
      jobAdDeleteLoading: false,
    }))
  ),
});

export const {
  name: jobsFeatureKey,
  reducer: jobsReducer,
  selectJobAds,
  selectJobAdsLoading,
  selectJobAdCreateLoading,
  selectJobAdsError,
  selectJobAdUpdateLoading,
  selectJobAdUpdateError,
  selectJobAdDeleteLoading,
  selectJobAdDeleteError,
} = jobsFeature;
