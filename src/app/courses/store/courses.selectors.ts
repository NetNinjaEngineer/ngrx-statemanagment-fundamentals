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

export const selectSeachQuery = createSelector(selectCoursesState, coursesState => coursesState.searchQuery);

export const selectSearchedCourses = createSelector(
    selectCourses,
    selectSeachQuery,
    (courses, searchQuery) => {

        console.log(searchQuery);


        if (!searchQuery) {
            return courses;
        }

        const lowerQuery = searchQuery.toLowerCase();

        return courses.filter(course =>
            course.title.toLowerCase().includes(lowerQuery) ||
            course.description.toLowerCase().includes(lowerQuery) ||
            course.instructor.toLowerCase().includes(lowerQuery) ||
            course.category.toLowerCase().includes(lowerQuery)
        );
    }
)


export const selectIsCreateCourseModalOpen = createSelector(selectCoursesState, coursesState => coursesState.showCreateCourseForm);

export const selectIsEditMode = createSelector(selectCoursesState, coursesState => coursesState.isEditMode);

export const getSelectedCourse = createSelector(selectCoursesState, coursesState => coursesState.selectedCourse);
