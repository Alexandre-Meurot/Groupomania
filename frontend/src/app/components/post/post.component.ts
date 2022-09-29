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
  @Output() refresh = new EventEmitter<void>()
  showComments!: boolean;
  userId!: string | null;
  likes$!: Observable<Likes[]>

  constructor(private likeService: LikeService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {
    this.showComments = false
    this.userId = localStorage.getItem('userId')
    this.likes$ = this.likeService.getAllLikes(this.post.id)
  }

  onComments():void {
    this.showComments = !this.showComments;
    console.log(this.post.Comments)
  }

  onLike(postId: number) {
    if (this.post.likes%2 == 0) {
      this.likeService.likePost(postId, {like: true})
        .subscribe(() => {
          console.log('UNLIKE')
          this.refresh.emit()
        })
    } else {
      this.likeService.likePost(postId, {like: false})
        .subscribe(() => {
          console.log('LIKE')
          this.refresh.emit()
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
