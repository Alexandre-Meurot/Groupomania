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

  // méthode d'ajout du nouveau post avec un ID valable croissant
  addPost(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<Post> {
    return this.getAllPosts().pipe(
      map(posts => [...posts].sort((a: Post, b: Post) => a.id - b.id)),
      map(sortedPosts => sortedPosts[sortedPosts.length - 1]),
      map(previousPost => ({
        ...formValue,
        likes: 0,
        createdDate: new Date(),
        id: previousPost.id + 1
      })),
      switchMap(newPost => this.http.post<Post>('http://localhost:3000/posts', newPost))
    )
  }

}
