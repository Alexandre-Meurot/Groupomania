import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post.model";
import {LikeService} from "../../services/like.service";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {Likes} from "../../models/likes.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Output() refresh = new EventEmitter<void>();
  likes!: Likes[]
  showComments!: boolean;
  userId!: string | null;
  isLiked!: boolean;
  loading!: boolean

  constructor(private likeService: LikeService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {
    this.loading = true
    this.showComments = false
    this.userId = localStorage.getItem('userId')
    this.isLiked = false

    this.likeService.getAllLikes(this.post.id)
      .subscribe(likes => this.likes = likes)
    if (this.likes) {
      // @ts-ignore
      let item1 = this.likes.find(like => like.postId == this.post.id && like.userId == +this.userId)
      this.isLiked = item1 != null
    }

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

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') == 'true';
  }

  onLike(postId: number) {

    if (this.userId != null) {

      // @ts-ignore
      let item = this.likes.find(like => like.postId == postId && like.userId == +this.userId)
      if (typeof item == 'undefined') {
        console.log('like')
        this.likeService.likePost(postId, {like: false})
          .subscribe(() => this.refresh.emit())
        console.log(item)
      } else {
        this.likeService.likePost(postId, {like: true})
          .subscribe(() => this.refresh.emit())
        console.log('dislike')
      }

  }}

  toAccountDetail(userId: number) {
    this.router.navigate(['account-detail'], { queryParams: {id: userId} })
  }
}
