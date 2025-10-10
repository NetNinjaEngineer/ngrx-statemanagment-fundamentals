import { ICourseV2 } from "../models/courseV2.model";


export interface CoursesV2State {
    courses: ICourseV2[],
    isCreateCourseFormVisible: boolean,
    isEditMode: boolean,
    selectedCourseToEdit: ICourseV2 | null
}

export const initialState: CoursesV2State = {
    courses: [],
    isCreateCourseFormVisible: false,
    isEditMode: false,
    selectedCourseToEdit: null
}