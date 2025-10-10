import { createAction, props } from "@ngrx/store";
import { ICourseV2 } from "../models/courseV2.model";

export const LOAD_COURSES = '[courses v2 page] load courses';
export const LOAD_COURSES_SUCCESS = '[courses v2 page] load courses success';
export const CREATE_COURSE = '[courses v2 page] create course';
export const CREATE_COURSE_SUCCESS = '[courses v2 page] create course success';

export const DELETE_COURSE = '[courses v2 page] delete course';
export const DELETE_COURSE_SUCCESS = '[courses v2 page] delete course success';

export const SET_CREATE_COURSE_FORM_VISIABLE = '[courses v2 page] is create course form visiable';

export const loadCourses = createAction(LOAD_COURSES);
export const loadCoursesSuccess = createAction(LOAD_COURSES_SUCCESS, props<{ courses: ICourseV2[] }>());

export const createCourse = createAction(CREATE_COURSE, props<{ newCourse: ICourseV2 }>());
export const createCourseSuccess = createAction(CREATE_COURSE_SUCCESS, props<{ course: ICourseV2 }>());

export const setCreateCourseFormVisiable = createAction(SET_CREATE_COURSE_FORM_VISIABLE, props<{ status: boolean }>());

export const deleteCourse = createAction(DELETE_COURSE, props<{ courseId: string }>());
export const deleteCourseSuccess = createAction(DELETE_COURSE_SUCCESS, props<{ courseId: string }>());