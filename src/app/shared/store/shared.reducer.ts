import { createReducer, on } from "@ngrx/store";
import { initialSharedState } from "./shared.state";
import { setErrorMessage, setLoadingSpinner } from "./shared.actions";

export const sharedReducer = createReducer(initialSharedState,
    on(setLoadingSpinner, (state, action) => {
        return {
            ...state,
            isLoading: action.isLoading
        }
    }),
    on(setErrorMessage, (state, action) => {
        return {
            ...state,
            errorMessage: action.message
        }
    })
)