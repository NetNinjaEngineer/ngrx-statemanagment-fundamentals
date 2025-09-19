import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const sharedFeatureKey = 'shared';

const selectSharedState = createFeatureSelector<SharedState>(sharedFeatureKey);

export const getIsLoading = createSelector(selectSharedState, (state) => state.isLoading);

export const getErrorMessage = createSelector(selectSharedState, (state) => state.errorMessage);