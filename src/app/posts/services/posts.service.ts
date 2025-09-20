import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPost } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private readonly httpClient: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>('https://ngrx-f4a2c-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
          const posts: IPost[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              posts.push({ ...responseData[key] });
            }
          }
          return posts;
        })
      );;
  }

  addPost(post: IPost): Observable<{ name: string }> {
    return this.httpClient.post<{ name: string }>('https://ngrx-f4a2c-default-rtdb.firebaseio.com/posts.json', post);
  }

}
