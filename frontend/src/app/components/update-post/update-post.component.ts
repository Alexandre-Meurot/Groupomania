import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {Post} from "../../models/post.model";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

  updateForm!: FormGroup;
  urlRegex!: RegExp;
  post!: Post
  postId: number = Number(localStorage.getItem('postId'))

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private postService: PostService) { }

  ngOnInit(): void {

    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.updateForm = this.formBuilder.group({
      content: [null, [Validators.minLength(3), Validators.maxLength(100)]],
      media: [null, [Validators.pattern(this.urlRegex)]]
    })

    this.postService.getPostById(this.postId)
      .subscribe(post => this.post = post)
  }

  updatePost() {
    console.log(this.updateForm.value)
    this.postService.updatePost(this.postId, this.updateForm.value)
      .subscribe(() => this.router.navigate(['home']))
  }

}
