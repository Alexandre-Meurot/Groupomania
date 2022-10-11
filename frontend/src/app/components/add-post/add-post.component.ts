import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PostService} from "../../services/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  @Output() refresh = new EventEmitter<void>();
  userId: number = Number(this.userService.getUserId());
  user!: User;
  postForm!: FormGroup;
  urlRegex!: RegExp;
  imagePreview!: string;
  file!: any
  content!: string

  constructor(private postService: PostService,
              private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
        content: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
        media: [null, null],
    })

    this.userService.getUserById(this.userId)
      .subscribe(user => this.user = user)

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
    this.postService.createPost(formData)
    .subscribe(() => {
      // this.postForm.reset()
      // this.reset()
      window.location.reload()
    })
  }

  reset() {
    this.imagePreview = ''
    this.refresh.emit()
  }
}
