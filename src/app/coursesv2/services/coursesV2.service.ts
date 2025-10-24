import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICourseV2 } from '../models/courseV2.model';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/store/auth.state';
import { selectLoggedInUser } from '../../auth/store/auth.selectors';
import { User } from '../../auth/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class CoursesV2Service {

    loggedUser: User | null = null;

    constructor(private readonly httpClient: HttpClient, private store: Store<{ auth: AuthState }>) {
        this.store.select(selectLoggedInUser).subscribe((data) => {
            this.loggedUser = data;
        })
    }

    loadCourses(): Observable<ICourseV2[]> {

        return this.httpClient.get<{ [key: string]: ICourseV2 }>(`${environment.firebaseConfig.databaseURL}/courses.json`).pipe(
            map(responseData => {
                const posts: ICourseV2[] = [];
                for (let key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        posts.push({ ...responseData[key], id: key });
                    }
                }
                return posts;
            })
        );
    }


    createCourse(course: ICourseV2): Observable<{ name: string }> {
        return this.httpClient.post<{ name: string }>(`${environment.firebaseConfig.databaseURL}/courses.json`, course);
    }

    deleteCourse(id: string) {
        return this.httpClient.delete(`${environment.firebaseConfig.databaseURL}/courses/${id}.json`);
    }

    updateCourse(id: string, data: ICourseV2) {
        return this.httpClient.put<ICourseV2>(`${environment.firebaseConfig.databaseURL}/courses/${id}.json`, data)
    }

}
