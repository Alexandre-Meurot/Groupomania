import {Component, OnInit} from '@angular/core';
import {Post} from "../models/post.model";
import {PostsService} from "../services/posts.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post!: Post;
  buttonText!: string;

  constructor(private postService: PostsService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.buttonText = 'like';
    const postId = +this.route.snapshot.params['id'];
    this.post = this.postService.getPostById(postId);
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
