import { createReducer, on } from "@ngrx/store";
import { initialState } from "./counter.state";
import { decrement, increment, incrementBy, reset } from "./counter.actions";

export const counterReducer = createReducer(
    initialState,
    on(increment, state => {
        return {
            ...state,
            count: state.count + 1
        }
    }),

    on(decrement, state => {
        return {
            ...state,
            count: state.count - 1
        }
    }),
    on(reset, state => {
        return {
            ...state,
            count: 0
        }
    }),
    on(incrementBy, (state, action) => {
        console.log(action)
        return {
            ...state,
            count: state.count + action.value
        }
    })
)