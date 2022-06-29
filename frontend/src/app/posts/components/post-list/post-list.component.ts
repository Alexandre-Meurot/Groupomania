import { Component, OnInit } from '@angular/core';
import {Post} from "../../../core/models/post.model";
import {PostsService} from "../../../core/services/posts.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  // initialisation de posts de type Observable Post[]
  posts$!: Observable<Post[]>;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    // initialisation du service posts + appelle méthode de récupération des posts
    this.posts$ = this.postsService.getAllPosts();
  }
}
