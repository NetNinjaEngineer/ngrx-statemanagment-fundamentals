import { createFeatureSelector, createSelector } from "@ngrx/store";
import { coursesAdapter, CoursesV2State } from "./coursesv2.state";
import { getParams, getQueryParams } from "../../router/router.selectors";

export const coursesV2FeatureKey = "coursesv2";

const {selectAll} = coursesAdapter.getSelectors();

const getCoursesV2State = createFeatureSelector<CoursesV2State>(coursesV2FeatureKey);

export const getCourses = createSelector(getCoursesV2State, state => selectAll(state));

export const getIsCreateCourseFormVisiable = createSelector(getCoursesV2State, state => state.isCreateCourseFormVisible);

// export const getIsEditMode = createSelector(getCoursesV2State, state => state.isEditMode);

// export const getSelectedCourseToEdit = createSelector(getCoursesV2State, state => state.selectedCourseToEdit);

export const getCourseByIdParams = createSelector(
    getCoursesV2State,
    getParams,
    (state, params) => {
        return selectAll(state).find(c => c.id === params['id']);
    }
)

export const getCourseByIdQueryParams = createSelector(
    getCoursesV2State,
    getQueryParams,
    (state, params) => {
        return selectAll(state).find(c => c.id === params['id']);
    }
)
