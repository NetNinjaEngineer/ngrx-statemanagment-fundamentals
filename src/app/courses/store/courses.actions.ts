import { createAction, props } from "@ngrx/store";
import { ICourseFilter } from "../models/courseFilter";

export const loadCourses = createAction('[courses]/loadCourses');

export const filterCourses = createAction('[courses]/filterCourses', props<{ filter: ICourseFilter }>())

export const searchCourses = createAction('[courses]/searchCourses', props<{ searchTerm: string }>());