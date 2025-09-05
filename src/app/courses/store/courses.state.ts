import { ICourse } from "../models/course.model"

export interface CoursesState {
    courses: ICourse[]
}

export const initialState: CoursesState = {
    courses: []
}