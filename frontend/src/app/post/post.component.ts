import { Component, OnInit, Input } from '@angular/core';
import {Post} from "../core/models/post.model";
import {PostsService} from "../core/services/posts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  buttonText!: string;

  constructor(private postService: PostsService,
              private router: Router) {}

  ngOnInit() {
    this.buttonText = 'like';
  };

  // méthode de renvoie vers l'url d'un seul post avec son ID
  onViewPost() {
    this.router.navigateByUrl(`posts/${this.post.id}`)
  }
}
