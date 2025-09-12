import { ICourse } from "../models/course.model"

export interface CoursesState {
    courses: ICourse[],
    coursesFilter: {
        category: string;
        instructor: string;
        maxPrice: number | null;
        minRating: number | null;
    },
    searchQuery: string,
    showCreateCourseForm: boolean,
    isEditMode: boolean,
    selectedCourse: ICourse | null
}

export const initialState: CoursesState = {
    courses: [],
    coursesFilter: {
        category: "",
        instructor: "",
        maxPrice: null,
        minRating: null
    },
    searchQuery: "",
    showCreateCourseForm: false,
    isEditMode: false,
    selectedCourse: null
}