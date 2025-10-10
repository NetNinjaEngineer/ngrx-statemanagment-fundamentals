import { createReducer, on } from "@ngrx/store";
import { initialState } from "./coursesv2.state";
import { createCourseSuccess, deleteCourseSuccess, loadCoursesSuccess, setCreateCourseFormVisiable } from "./coursesv2.actions";

export const coursesV2Reducer = createReducer(initialState,
    on(loadCoursesSuccess, (state, { courses }) => {
        return {
            ...state,
            courses: [...courses]
        }
    }),

    on(createCourseSuccess, (state, action) => {
        return {
            ...state,
            courses: [...state.courses, action.course]
        }
    }),

    on(setCreateCourseFormVisiable, (state, { status }) => {
        return {
            ...state,
            isCreateCourseFormVisible: status
        }
    }),

    on(deleteCourseSuccess, (state, action) => {
        const updatedCourses = state.courses.filter(c => c.id !== action.courseId);
        return {
            ...state,
            courses: updatedCourses
        }
    }),
)