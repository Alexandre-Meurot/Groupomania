import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post.model";
import {LikeService} from "../../services/like.service";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Output() refresh = new EventEmitter<void>()
  showComments!: boolean;
  userId!: string | null;
  isLiked!: boolean
  likesNbrs!: number

  constructor(private likeService: LikeService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {
    this.showComments = false
    this.userId = localStorage.getItem('userId')
    this.likesNbrs = this.post.likes
    this.isLiked = false
  }

  onComments():void {
    this.showComments = !this.showComments;
    console.log(this.post.Comments)
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

  onLike(postId: number) {
    if (!this.isLiked) {
      this.isLiked = true
      this.likeService.likePost(postId, { like: false })
      this.likesNbrs ++
      this.refresh.emit()
    } else {
      this.isLiked = false
      this.likeService.likePost(postId, { like: true })
      this.likesNbrs --
      this.refresh.emit()
    }
  }

  toAccountDetail(userId: number) {
    this.router.navigate(['account-detail'], { queryParams: {id: userId} })
  }
}
