import { createAction, props } from "@ngrx/store";
import { ICourseFilter } from "../models/courseFilter";
import { ICourse } from "../models/course.model";

export const loadCourses = createAction('[courses]/loadCourses');

export const filterCourses = createAction('[courses]/filterCourses', props<{ filter: ICourseFilter }>())

export const searchCourses = createAction('[courses]/searchCourses', props<{ searchTerm: string }>());

export const setCreateCourseFormVisible = createAction('[courses]/setShowCreateCourseForm', props<{ showCreateCourse: boolean }>());

export const createCourse = createAction('[courses]/createCourse', props<{ course: ICourse }>());

export const setEditMode = createAction('[courses]/setEditMode', props<{ isEditMode: boolean }>());

export const setSelectedCourse = createAction('[courses]/setSelectedCourse', props<{ selectedCourse: ICourse | null }>());

export const updateCourse = createAction('[courses]/updateCourse', props<{ course: ICourse }>());

export const deleteCourse = createAction('[courses]/deleteCourse', props<{ courseId: number }>());