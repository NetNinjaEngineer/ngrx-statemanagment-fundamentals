import { createAction, props } from "@ngrx/store";

export const setLoadingSpinner = createAction('[shared]/setLoadingSpinner', props<{ isLoading: boolean }>());

export const setErrorMessage = createAction('[shared]/setErrorMessage', props<{ message: string }>());