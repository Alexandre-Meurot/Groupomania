import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post.model";
import {LikeService} from "../../services/like.service";
import {PostService} from "../../services/post.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Output() refresh =new EventEmitter<void>()
  showComments!: boolean;
  isLiked: number = 0;
  userId!: string | null;

  constructor(private likeService: LikeService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {
    this.showComments = false
    this.userId = localStorage.getItem('userId')
  }

  onComments():void {
    this.showComments = !this.showComments;
    console.log(this.post.Comments)
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
    this.postService.deletePost(postId).subscribe(() => {
      this.refresh.emit()
    })
  }

  onUpdate(postId: number) {
    localStorage.setItem('postId', postId.toString())
    this.router.navigate(['update'])
  }

  myOwnPost(): boolean {
    return this.userId == this.post.userId.toString()
  }

}
