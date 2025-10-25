import { ICourseV2 } from "../models/courseV2.model";
import { createEntityAdapter, EntityState } from "@ngrx/entity";


// export interface CoursesV2State {
//     courses: ICourseV2[],
//     isCreateCourseFormVisible: boolean
// }

// export const initialState: CoursesV2State = {
//     courses: [],
//     isCreateCourseFormVisible: false
// }

// Using Entity Adapter for better state management
// and performance with large collections
// is an object that holds methods and properties to manage a collection of entities
export const coursesAdapter = createEntityAdapter<ICourseV2>();

export interface CoursesV2State extends EntityState<ICourseV2> {
    isCreateCourseFormVisible: boolean
}

export const initialState: CoursesV2State = coursesAdapter.getInitialState({
    isCreateCourseFormVisible: false
});

