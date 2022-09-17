import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  newPost!: Post;
  addPostForm!: FormGroup;

  constructor(private postService: PostService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.addPostForm = this.formBuilder.group({
      content: ['', Validators.required],
      media: ['']
    })

    this.newPost = new Post()
  }

  onAddPost() {
    console.log(this.addPostForm.value)
    this.postService.createPost(this.addPostForm.value)
      .subscribe()
  }

}
