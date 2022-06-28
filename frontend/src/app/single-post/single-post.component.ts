import {Component, OnInit} from '@angular/core';
import {Post} from "../models/post.model";
import {PostsService} from "../services/posts.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  posts$!: Observable<Post>;
  buttonText!: string;

  constructor(private postService: PostsService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.buttonText = 'like';
    const postId = +this.route.snapshot.params['id'];
    this.posts$ = this.postService.getPostById(postId);
  };

  onLike(postId: number) {
    if (this.buttonText === 'like') {
      this.postService.likePostById(postId, "like");
      this.buttonText = 'disLike';
    } else {
      this.postService.likePostById(postId, 'disLike')
      this.buttonText = 'like';
    }
  };

}
