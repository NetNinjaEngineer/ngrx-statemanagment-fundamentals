import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesV2State } from "./coursesv2.state";
import { getParams } from "../../router/router.selectors";

export const coursesV2FeatureKey = "coursesv2";

const getCoursesV2State = createFeatureSelector<CoursesV2State>(coursesV2FeatureKey);

export const getCourses = createSelector(getCoursesV2State, state => state.courses);

export const getIsCreateCourseFormVisiable = createSelector(getCoursesV2State, state => state.isCreateCourseFormVisible);

export const getIsEditMode = createSelector(getCoursesV2State, state => state.isEditMode);

export const getSelectedCourseToEdit = createSelector(getCoursesV2State, state => state.selectedCourseToEdit);

export const getCourseById = createSelector(
    getCoursesV2State,
    getParams,
    (state, params) => {
        return state.courses.find(c => c.id === params['id']);
    }
)
