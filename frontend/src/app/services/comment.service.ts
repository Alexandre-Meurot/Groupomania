import {Injectable} from "@angular/core";
import {PostService} from "./post.service";
import {Observable, tap} from "rxjs";
import {Comment} from "../models/comment.model";
import {Post} from "../models/post.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class CommentService {

  constructor(private postService: PostService,
              private http: HttpClient) { }

  getAllComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`http://localhost:3000/api/comment/${postId}`).pipe(
      tap((response) => console.table(response))
    )
  }

  createComment() {

  }

  deleteComment() {

  }

}
