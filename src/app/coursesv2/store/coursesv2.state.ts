import { ICourseV2 } from "../models/courseV2.model";


export interface CoursesV2State {
    courses: ICourseV2[],
    isCreateCourseFormVisible: boolean
}

export const initialState: CoursesV2State = {
    courses: [],
    isCreateCourseFormVisible: false
}