import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  postForm!: FormGroup;
  postPreview$!: Observable<Post>;
  urlRegex!: RegExp;

  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {

    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.postForm = this.formBuilder.group({
      content: [null, Validators.required],
      media: [null, Validators.pattern(this.urlRegex)],
    }, {
      updateOn: 'blur'
    });

    this.postPreview$ = this.postForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
      }))
    );

  }

  onAddPost(): void {
    console.log(this.postForm.value)
    this.postService.createPost(this.postForm.value).pipe(
      tap(() => this.router.navigateByUrl('/home'))
    ).subscribe();
  }

}
