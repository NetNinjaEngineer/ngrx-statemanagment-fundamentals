import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "./custom-serializer";
import { RouterReducerState } from "@ngrx/router-store";

const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>("router");

export const getParams = createSelector(getRouterState, routerState => routerState.state.params);

export const getQueryParams = createSelector(getRouterState, routerState => routerState.state.queryParams);

export const getUrl = createSelector(getRouterState, routerState => routerState.state.url);


