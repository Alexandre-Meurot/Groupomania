import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Likes} from "../models/likes.model";

@Injectable({
  providedIn: 'root'
})

export class LikeService {

  constructor(private http: HttpClient,) {}


  likePost(postId: number, isLiked: Object): Observable<Likes> {
    console.log("C'est liké !")
    new Likes()
    return this.http.post<Likes>(`http://localhost:3000/api/post/${postId}/like`, isLiked )
  }

  unLikePost(postId: number, isLiked: Object): Observable<Likes> {
    console.log("C'est disLiké !")
    return this.http.post<Likes>(`http://localhost:3000/api/post/${postId}/like`, isLiked)
  }

}
