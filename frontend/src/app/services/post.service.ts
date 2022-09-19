import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/api/post').pipe(
      tap((response) => console.table(response)),
      catchError((error) => {
        console.log(error)
        return of([])
      })
    )
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/api/post/${postId}`)
  }

  createPost(newPost: Post): Observable<Object|null> {
    return this.http.post('http://localhost:3000/api/post', newPost).pipe(
      tap((response) => console.table(response)),
      catchError((error) => {
        console.log(error)
        return of(null)
      })
    )
  }


}
