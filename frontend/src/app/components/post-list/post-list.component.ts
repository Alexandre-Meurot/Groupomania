import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post.model";
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>

  constructor(private postService: PostService) { }

  ngOnInit(): void {

    this.getPosts()

  }

  getPosts() {
    this.posts$ = this.postService.getAllPosts()
  }


}
