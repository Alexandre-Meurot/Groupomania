import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {Post} from "../../models/post.model";
import {tap} from "rxjs";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

  updateForm!: FormGroup;
  post!: Post
  postId: number = Number(localStorage.getItem('postId'))
  imagePreview!: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private postService: PostService) { }

  ngOnInit(): void {

    this.updateForm = this.formBuilder.group({
      content: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      media: [null, null]
    })

    this.postService.getPostById(this.postId)
      .subscribe(post => this.post = post)
  }


  onFileAdded(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0]
    this.updateForm.get('media')?.setValue(file)
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  backToHome() {
    this.router.navigate(['home'])
  }

  updatePost() {
    const formData = new FormData();
    formData.append('content', this.updateForm.get('content')?.value)
    formData.append('media', this.updateForm.get('media')?.value)
    this.postService.updatePost(this.postId, formData).pipe(
      tap(() => this.router.navigateByUrl('/home'))
    ).subscribe()
  }

}
