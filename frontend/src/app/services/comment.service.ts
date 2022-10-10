import {Injectable} from "@angular/core";
import {PostService} from "./post.service";
import {Observable, switchMap} from "rxjs";
import {Comment} from "../models/comment.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class CommentService {

  constructor(private postService: PostService,
              private http: HttpClient) { }

  getAllComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`http://localhost:3000/api/comment/${postId}`)
  }

  createComment(newComment: Comment, postId: number): Observable<Comment> {
    return this.getAllComments(postId).pipe(
      switchMap(comment => this.http.post<Comment>(`http://localhost:3000/api/comment/${postId}`, newComment))
    )
  }

  deleteComment(commentId: number): Observable<Comment> {
    return this.http.delete<Comment>(`http://localhost:3000/api/comment/${commentId}`)
  }

}
