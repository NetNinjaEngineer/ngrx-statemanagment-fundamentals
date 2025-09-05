import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.state";

const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectCourses = createSelector(selectCoursesState, coursesState => coursesState.courses);