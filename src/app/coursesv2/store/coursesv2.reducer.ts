import { createReducer, on } from "@ngrx/store";
import { coursesAdapter, initialState } from "./coursesv2.state";
import { createCourseSuccess, deleteCourseSuccess, loadCoursesSuccess, setCreateCourseFormVisiable, setEditMode, setSelectedCourseToEdit, updateCourse, updateCourseSuccess } from "./coursesv2.actions";

export const coursesV2Reducer = createReducer(
    initialState,

    on(loadCoursesSuccess, (state, { courses }) => coursesAdapter.setAll(courses, state)),

    on(createCourseSuccess, (state, action) => coursesAdapter.addOne(action.course, state)),

    on(deleteCourseSuccess, (state, action) => coursesAdapter.removeOne(action.courseId, state)),

    on(updateCourseSuccess, (state, { course }) => {
        return coursesAdapter.updateOne({
            id: course.id,
            changes: course
        }, state);
    }),

    on(setEditMode, (state, action) => {
        return {
            ...state,
            isEditMode: action.isEditMode
        }
    }),

    on(setCreateCourseFormVisiable, (state, { status }) => {
        return {
            ...state,
            isCreateCourseFormVisible: status
        }
    }),

    on(setSelectedCourseToEdit, (state, action) => {
        return {
            ...state,
            selectedCourseToEdit: action.course
        }
    }),

)