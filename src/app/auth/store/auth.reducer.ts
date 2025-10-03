import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginSuccess, logout, registerSuccess } from "./auth.actions";

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(registerSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(logout, (state) => {
        return {
            ...state,
            user: null
        }
    })
);

