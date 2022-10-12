import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post.model";
import {LikeService} from "../../services/like.service";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {Likes} from "../../models/likes.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Output() refresh = new EventEmitter<void>()

  likes!: Likes[]
  showComments!: boolean
  userId!: string | null
  isLiked!: boolean
  buttonText!: string

  constructor(private likeService: LikeService,
              private postService: PostService,
              private commentService: CommentService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.showComments = false
    this.userId = localStorage.getItem('userId')

    this.getAllLikes()
  }

  getAllLikes() {
    this.likeService.getAllLikes(this.post.id)
      .subscribe(likes => {
        this.likes = likes
        this.post.Likes = likes
        if (this.likes) {
          // @ts-ignore
          this.isLiked = this.likes.some(like => like.postId == this.post.id && like.userId == +this.userId)
          if (!this.isLiked) {
            this.buttonText = "J'aime"
          } else {
            this.buttonText = "Je n'aime plus"
          }
        }
      })
  }


  onComments():void {
    this.showComments = !this.showComments;
  }

  onConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent)
    dialogRef.afterClosed().subscribe(formData => {
      if (!formData) {
        return 'Suppression annulée !'
      }
      this.postService.deletePost(this.post.id)
        .subscribe(() => this.refresh.emit())
      return 'Suppression confirmée !'
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
      let alreadyLiked = this.likes.find(like => like.postId == postId && like.userId == +this.userId)
      if (typeof alreadyLiked == 'undefined') {
        this.likeService.likePost(postId, {like: false})
          .subscribe(() => {
            this.getAllLikes()
          })
      } else {
        this.likeService.likePost(postId, {like: true})
          .subscribe(() => {
            this.getAllLikes()
          })
      }

  }}

  toAccountDetail(userId: number) {
    this.router.navigate(['account-detail'], { queryParams: {id: userId} })
  }
}
