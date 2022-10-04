import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  postForm!: FormGroup;
  urlRegex!: RegExp;
  imagePreview!: string;
  file!: any
  content!: string

  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
        content: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
        media: [null, null],
    })
  }

  getFile(event: any) {
    this.file = event.target.files[0]
    console.log("media:", this.file)
  }

  getContent(content: string) {
    this.content = content
  }

  onFileAdded(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0]
    this.postForm.get('media')?.setValue(file)
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  submitData() {
    const formData = new FormData();
    formData.append('content', this.postForm.get('content')?.value)
    formData.append('media', this.postForm.get('media')?.value)
    this.postService.createPost(formData).pipe(
      tap(() => this.router.navigateByUrl('/home'))
    ).subscribe()
  }

  backToHome() {
    this.router.navigate(['home'])
  }
}
