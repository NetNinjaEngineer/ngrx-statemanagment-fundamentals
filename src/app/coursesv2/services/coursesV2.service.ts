import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICourseV2 } from '../models/courseV2.model';

@Injectable({
    providedIn: 'root'
})
export class CoursesV2Service {
    constructor(private readonly httpClient: HttpClient) { }

    loadCourses(): Observable<ICourseV2[]> {
        return this.httpClient.get<{ [key: string]: ICourseV2 }>('https://ngrx-f4a2c-default-rtdb.firebaseio.com/courses.json').pipe(
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
        return this.httpClient.post<{ name: string }>('https://ngrx-f4a2c-default-rtdb.firebaseio.com/courses.json', course);
    }

    deleteCourse(id: string) {
        return this.httpClient.delete(`https://ngrx-f4a2c-default-rtdb.firebaseio.com/courses/${id}.json`);
    }

    updateCourse(id: string, data: ICourseV2) {
        return this.httpClient.put<ICourseV2>(`https://ngrx-f4a2c-default-rtdb.firebaseio.com/courses/${id}.json`, data)
    }

}
