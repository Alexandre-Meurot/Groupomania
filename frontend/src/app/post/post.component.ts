import { Component, OnInit, Input } from '@angular/core';
import {Post} from "../models/post.model";
import {PostsService} from "../services/posts.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  buttonText!: string;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.buttonText = 'like';
  };

  onLike() {
    if (this.buttonText === 'like') {
      this.postService.likePostById(this.post.id, "like");
      this.buttonText = 'disLike';
    } else {
      this.postService.likePostById(this.post.id, 'disLike')
      this.buttonText = 'like';
    }
  };

}
