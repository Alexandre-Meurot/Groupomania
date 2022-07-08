import { Component, OnInit, Input } from '@angular/core';
import {Post} from "../../../core/models/post.model";
import {PostsService} from "../../../core/services/posts.service";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  buttonText!: string;
  posts$!: Observable<Post>;

  constructor(private postService: PostsService,
              private router: Router) {}

  ngOnInit() {
    this.buttonText = 'like';
  };

  // méthode de renvoie vers l'url d'un seul post avec son ID
  onViewPost() {
    this.router.navigateByUrl(`posts/${this.post.id}`)
  }

  onLike(postId: number) {
    if (this.buttonText === 'like') {
      this.posts$ = this.postService.likePostById(postId, "like").pipe(
        tap(() => this.buttonText = 'disLike')
      );
    } else {
      this.posts$ = this.postService.likePostById(postId, 'disLike').pipe(
        tap(() => this.buttonText = 'like')
      );
    }
  };
}
