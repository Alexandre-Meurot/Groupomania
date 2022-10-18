import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Likes} from "../models/likes.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class LikeService {
  private apiBaseurl = environment.apiBaseUrl

  constructor(private http: HttpClient,
              ) {}

  likePost(postId: number, like: Object): Observable<Likes> {
    return this.http.post<Likes>(`${ this.apiBaseurl }/api/post/${postId}/like`, like )
  }

  getAllLikes(postId: number): Observable<Likes[]> {
    return this.http.get<Likes[]>(`${ this.apiBaseurl }/api/post/${postId}/like`)
  }

}
