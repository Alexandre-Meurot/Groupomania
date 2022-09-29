import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {Likes} from "../models/likes.model";
import {PostService} from "./post.service";

@Injectable({
  providedIn: 'root'
})

export class LikeService {

  constructor(private http: HttpClient,
              private postService: PostService) {}

  likePost(postId: number, like: Object): Observable<Likes> {
    return this.http.post<Likes>(`http://localhost:3000/api/post/${postId}/like`, like )
  }

  getAllLikes(postId: number): Observable<Likes[]> {
    return this.http.get<Likes[]>(`http://localhost:3000/api/post/${postId}/like`)
  }



}