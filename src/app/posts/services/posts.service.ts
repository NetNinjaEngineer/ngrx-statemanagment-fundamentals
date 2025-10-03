import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPost } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private readonly httpClient: HttpClient) { }

    getPosts(): Observable<IPost[]> {

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');

        // let queryParams = new HttpParams();
        // queryParams = queryParams.set('page', 2);

        return this.httpClient.get<{ [key: string]: IPost }>('https://ngrx-f4a2c-default-rtdb.firebaseio.com/posts.json', {
            headers: headers
        })
            .pipe(
                map(responseData => {
                    const posts: IPost[] = [];
                    for (let key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            posts.push({ ...responseData[key], id: key });
                        }
                    }
                    return posts;
                })
            );
    }


    addPost(post: IPost): Observable<{ name: string }> {
        return this.httpClient.post<{ name: string }>('https://ngrx-f4a2c-default-rtdb.firebaseio.com/posts.json', post);
    }

    deletePost(id: string) {
        return this.httpClient.delete(`https://ngrx-f4a2c-default-rtdb.firebaseio.com/posts/${id}.json`);
    }

    updatePost(id: string, data: IPost): Observable<IPost> {
        return this.httpClient.put<IPost>(`https://ngrx-f4a2c-default-rtdb.firebaseio.com/posts/${id}.json`, data);
    }




}
