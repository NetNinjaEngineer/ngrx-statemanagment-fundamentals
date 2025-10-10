import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { SharedState } from "../../shared/store/shared.state";
import { setLoadingSpinner } from "../../shared/store/shared.actions";
import { CoursesV2State } from "./coursesv2.state";
import { CoursesV2Service } from "../services/coursesV2.service";
import { createCourse, createCourseSuccess, deleteCourse, deleteCourseSuccess, loadCourses, loadCoursesSuccess } from "./coursesv2.actions";

@Injectable()
export class CoursesV2Effects {
    actions$ = inject(Actions);
    coursesService = inject(CoursesV2Service);
    store = inject(Store<{ coursesv2: CoursesV2State, shared: SharedState }>);


    loadCourses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadCourses),
            mergeMap((action) => {
                this.store.dispatch(setLoadingSpinner({ isLoading: true }));
                return this.coursesService.loadCourses().pipe(
                    map((response) => {
                        console.log(response);
                        this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                        return loadCoursesSuccess({ courses: response })
                    }),
                    catchError((err) => {
                        console.log(err);
                        this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                        return of();
                    })
                )
            })
        )
    })

    createNewCourse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createCourse),
            mergeMap((action) => {
                console.log(action);
                this.store.dispatch(setLoadingSpinner({ isLoading: true }));
                return this.coursesService.createCourse(action.newCourse).pipe(
                    map((responseData) => {
                        console.log(responseData);
                        this.store.dispatch(setLoadingSpinner({ isLoading: false }));
                        return createCourseSuccess({ course: action.newCourse });
                    }),
                    catchError((errResponse) => {
                        console.log(errResponse);
                        this.store.dispatch(setLoadingSpinner({ isLoading: false }));

                        return of()
                    })
                )

            })
        )
    });

    deleteCourse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteCourse),
            exhaustMap((action) => {
                return this.coursesService.deleteCourse(action.courseId).pipe(
                    map((responseData) => {
                        console.log(responseData);
                        return deleteCourseSuccess({ courseId: action.courseId });
                    }),
                    catchError((err) => {
                        console.log(err);
                        return of();
                    })
                )
            })
        )
    })


}