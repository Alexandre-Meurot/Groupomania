import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable, switchMap } from "rxjs";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/api/post')
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/api/post/${postId}`)
  }

  createPost(newPost: FormData): Observable<Post> {
    return this.getAllPosts().pipe(
      switchMap(post => this.http.post<Post>('http://localhost:3000/api/post', newPost))
    )
  }

  deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>(`http://localhost:3000/api/post/${postId}`)
  }

  updatePost(postId: number, postUpdated: FormData): Observable<Post> {
    return this.http.put<Post>(`http://localhost:3000/api/post/${postId}`, postUpdated)
  }


}
