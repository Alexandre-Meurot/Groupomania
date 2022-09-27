import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post.model";
import {LikeService} from "../../services/like.service";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {Likes} from "../../models/likes.model";
import {Observable} from "rxjs";

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
  like!: Observable<Likes[]>

  constructor(private likeService: LikeService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {
    this.showComments = false
    this.userId = localStorage.getItem('userId')
    this.like = this.likeService.getAllLikes(this.post.id)
  }

  onComments():void {
    this.showComments = !this.showComments;
    console.log(this.post.Comments)
  }

  onLike(postId: number) {
    if (this.isLiked == 0) {
      this.likeService.likePost(postId, {like: false})
        .subscribe(() => {
          this.isLiked++
          this.refresh.emit()

          console.log(this.isLiked)
        })
    } else if (this.isLiked == 1) {
      this.likeService.likePost(postId, {like: true})
        .subscribe(() => {
          this.isLiked--
          this.refresh.emit()

          console.log(this.isLiked)
        })
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
