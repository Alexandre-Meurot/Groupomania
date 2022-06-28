import {Injectable} from "@angular/core";
import {Post} from "../models/post.model";
import {HttpClient} from "@angular/common/http";
import {map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class PostsService {

  // injection du httpClient
  constructor(private http: HttpClient) {
  }

  // méthode de récupération de tous les posts
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/posts');
  }

  // méthode de récupération d'un post en fonction de son ID
  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/posts/${postId}`)
  }

  // méthode de like de post en fonction de son ID
  likePostById(postId: number, likeType: 'like' | 'disLike'): Observable<Post> {
    return this.getPostById(postId).pipe(
      map(post => ({
        ...post,
        likes: post.likes + (likeType === 'like' ? 1 : -1)
      })),
      switchMap(updatedPost => this.http.put<Post>(`http://localhost:3000/posts/${postId}`, updatedPost))
    );
  }

  // méthode d'ajout du nouveau post avec un ID valable
  // addPost(formValue: { title: string, description: string, imageUrl: string, location: string }): void {
  //   const post: Post = {
  //     ...formValue,
  //     createdDate: new Date(),
  //     likes: 0,
  //     id: this.posts[this.posts.length - 1].id + 1
  //   };
  //   this.posts.push(post);
  // }

}
