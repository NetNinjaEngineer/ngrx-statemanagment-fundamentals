import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.state";

const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectCourses = createSelector(selectCoursesState, coursesState => coursesState.courses);

export const selectActiveFilterCourses = createSelector(selectCoursesState, coursesState => coursesState.coursesFilter);

export const selectFilteredCourses = createSelector(
    selectCourses,
    selectActiveFilterCourses,
    (courses, filter) => {

        return courses.filter(course =>
            (!filter.category || course.category.toLowerCase() === filter.category.toLowerCase()) &&
            (!filter.instructor || course.instructor.toLowerCase() === filter.instructor.toLowerCase()) &&
            (!filter.maxPrice || course.price <= filter.maxPrice) &&
            (!filter.minRating || course.rating >= filter.minRating));


    }

);