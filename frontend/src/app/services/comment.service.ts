import {Injectable} from "@angular/core";
import {PostService} from "./post.service";
import {Observable, switchMap} from "rxjs";
import {Comment} from "../models/comment.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})

export class CommentService {
  private apiBaseUrl = environment.apiBaseUrl

  constructor(private postService: PostService,
              private http: HttpClient,
              ) { }

  getAllComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${ this.apiBaseUrl }/api/comment/${postId}`)
  }

  createComment(newComment: Comment, postId: number): Observable<Comment> {
    return this.getAllComments(postId).pipe(
      switchMap(comment => this.http.post<Comment>(`${ this.apiBaseUrl }/api/comment/${postId}`, newComment))
    )
  }

  deleteComment(commentId: number): Observable<Comment> {
    return this.http.delete<Comment>(`${ this.apiBaseUrl }/api/comment/${commentId}`)
  }

}
