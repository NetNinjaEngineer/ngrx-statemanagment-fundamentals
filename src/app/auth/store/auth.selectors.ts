import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const authFeatureKey = 'auth';

const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectLoggedInUser = createSelector(selectAuthState, authState => authState.user);

export const isAuthenticated = createSelector(selectAuthState, state => state.user ? true : false);

export const getAccessToken = createSelector(selectAuthState, state => state.user?.Token);