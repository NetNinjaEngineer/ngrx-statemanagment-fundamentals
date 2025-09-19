export interface SharedState {
    isLoading: boolean;
    errorMessage: string;
}

export const initialSharedState: SharedState = {
    isLoading: false,
    errorMessage: ""
};