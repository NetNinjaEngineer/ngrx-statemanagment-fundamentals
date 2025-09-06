import { createAction, props } from "@ngrx/store";
import { ICourseFilter } from "../models/courseFilter";
import { ICourse } from "../models/course.model";

export const loadCourses = createAction('[courses]/loadCourses');

export const filterCourses = createAction('[courses]/filterCourses', props<{ filter: ICourseFilter }>())

export const searchCourses = createAction('[courses]/searchCourses', props<{ searchTerm: string }>());

export const setCreateCourseFormVisible = createAction('[courses]/setShowCreateCourseForm', props<{ showCreateCourse: boolean }>());

export const createCourse = createAction('[courses]/createCourse', props<{ course: ICourse }>());