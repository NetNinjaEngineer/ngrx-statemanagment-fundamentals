// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { ICourse } from '../models/course.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CoursesService {
//   loadCourses(): Observable<ICourse[]> {
//     return this.httpClient.get<{ [key: string]: ICourse }>('https://ngrx-f4a2c-default-rtdb.firebaseio.com/courses.json').pipe(
//       map(responseData => {
//         const posts: ICourse[] = [];
//         for (let key in responseData) {
//           if (responseData.hasOwnProperty(key)) {
//             posts.push({ ...responseData[key], id: key });
//           }
//         }
//         return posts;
//       })
//     );
//   }

//   constructor(private readonly httpClient: HttpClient) { }

//   createCourse(course: ICourse): Observable<{ name: string }> {
//     return this.httpClient.post<{ name: string }>('https://ngrx-f4a2c-default-rtdb.firebaseio.com/courses.json', course);
//   }

// }
