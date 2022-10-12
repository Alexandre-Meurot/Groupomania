import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/post.model";
import {Observable} from "rxjs";
import {Likes} from "../../models/likes.model";
import {LikeService} from "../../services/like.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>
  likes$!: Observable<Likes[]>

  constructor(private postService: PostService,
              private likeService: LikeService) { }

  ngOnInit(): void {

    this.getPosts()

  }

  getPosts() {
    this.posts$ = this.postService.getAllPosts()
  }

  getLikes(postId: number) {
    this.likes$ = this.likeService.getAllLikes(postId)
  }



}
