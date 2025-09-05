export interface CounterState {
    count: number,
    isLoading: boolean
}

export const initialState: CounterState = {
    count: 0,
    isLoading: false
}