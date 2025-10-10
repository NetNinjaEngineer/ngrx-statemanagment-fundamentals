import { createReducer, on } from "@ngrx/store";
import { initialState } from "./coursesv2.state";
import { createCourseSuccess, deleteCourseSuccess, loadCoursesSuccess, setCreateCourseFormVisiable, setEditMode, setSelectedCourseToEdit, updateCourse, updateCourseSuccess } from "./coursesv2.actions";

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

    on(setEditMode, (state, action) => {
        return {
            ...state,
            isEditMode: action.isEditMode
        }
    }),

    on(setSelectedCourseToEdit, (state, action) => {
        return {
            ...state,
            selectedCourseToEdit: action.course
        }
    }),

    on(updateCourseSuccess, (state, action) => {
        const updatedCourses = state.courses.map(c => {
            if (c.id === action.course.id)
                return action.course;
            else
                return c;
        });

        return {
            ...state,
            courses: updatedCourses
        }
    })
)