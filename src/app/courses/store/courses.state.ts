import { ICourse } from "../models/course.model"

export interface CoursesState {
    courses: ICourse[],
    coursesFilter: {
        category: string;
        instructor: string;
        maxPrice: number | null;
        minRating: number | null;
    }
}

export const initialState: CoursesState = {
    courses: [],
    coursesFilter: {
        category: "",
        instructor: "",
        maxPrice: null,
        minRating: null
    }
}