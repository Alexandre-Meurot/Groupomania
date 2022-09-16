import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postList!: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {

    this.postService.getAllPosts()
      .subscribe(postList => this.postList = postList)
  }

}
