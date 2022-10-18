import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable, switchMap } from "rxjs";
import {Post} from "../models/post.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})


export class PostService {
  private apiBaseUrl = environment.apiBaseUrl

  constructor(private http: HttpClient,
              ) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiBaseUrl}/api/post`)
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiBaseUrl}/api/post/${postId}`)
  }

  createPost(newPost: FormData): Observable<Post> {
    return this.getAllPosts().pipe(
      switchMap(post => this.http.post<Post>(`${ this.apiBaseUrl }/api/post`, newPost))
    )
  }

  deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>(`${ this.apiBaseUrl }/api/post/${postId}`)
  }

  updatePost(postId: number, postUpdated: FormData): Observable<Post> {
    return this.http.put<Post>(`${ this.apiBaseUrl }/api/post/${postId}`, postUpdated)
  }


}
