import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {LikeService} from "../../services/like.service";
import {Likes} from "../../models/likes.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  showComments!: boolean;
  isLiked: number = 0;

  constructor(private likeService: LikeService) { }

  ngOnInit(): void {
    this.showComments = false
  }

  onComments():void {
    this.showComments = !this.showComments;
  }

  onLike(postId: number) {
    if (this.isLiked === 0) {
      this.likeService.likePost(postId, {like: false}).subscribe()
      this.isLiked ++
    } else {
      this.likeService.unLikePost(postId, {like: true}).subscribe()
      this.isLiked --
    }

  }

}
