import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {LikeService} from "../../services/like.service";
import {PostService} from "../../services/post.service";
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  showComments!: boolean;
  isLiked: number = 0;

  constructor(private likeService: LikeService,
              private postService: PostService) { }

  ngOnInit(): void {
    this.showComments = false
  }

  onComments():void {
    this.showComments = !this.showComments;
  }

  onLike(postId: number) {
    if (this.isLiked == 0) {
      console.log(this.isLiked)
      this.likeService.likePost(postId, {like: false}).pipe(
        tap(() => {
          this.postService.getAllPosts()
          this.isLiked ++
        })
      ).subscribe()
    } else if (this.isLiked == 1) {
      console.log(this.isLiked)
      this.likeService.likePost(postId, {like: true}).pipe(
        tap(() => {
          this.postService.getAllPosts()
          this.isLiked --
        })
      ).subscribe()
    }
  }

  onDelete(postId: number) {
    this.postService.getAllPosts().pipe(
      switchMap(post => this.postService.deletePost(postId))
    ).subscribe()
  }

  onUpdate(postId: number) {
    this.postService.updatePost(postId).subscribe()
  }

}
