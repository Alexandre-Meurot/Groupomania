import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>
  loading!: boolean

  constructor(private postService: PostService) { }

  ngOnInit(): void {

    this.loading = false

    this.getPosts()

  }

  getPosts() {
    this.posts$ = this.postService.getAllPosts()
    this.loading = false
  }

}
