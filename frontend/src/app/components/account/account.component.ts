import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  userId: number = Number(this.userService.getUserId());
  user!: User;
  updateForm!: FormGroup;
  urlRegex!: RegExp;
  imagePreview!: string;


  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.updateForm = this.formBuilder.group({
      email: [null,[Validators.required,  Validators.email]],
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      bio: [null, [Validators.minLength(10), Validators.maxLength(200)]],
      picture: [null, null]
    })

    this.userService.getUserById(this.userId)
      .subscribe(user => this.user = user)

  }

  onFileAdded(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0]
    this.updateForm.get('picture')?.setValue(file)
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  onUpdate() {
    const formData = new FormData();
    formData.append('email', this.updateForm.get('email')?.value)
    formData.append('username', this.updateForm.get('username')?.value)
    formData.append('bio', this.updateForm.get('bio')?.value)
    formData.append('picture', this.updateForm.get('picture')?.value)
    this.userService.updateUser(formData).pipe(
      tap(() => this.router.navigateByUrl('/home'))
    ).subscribe()
  }

  onDelete() {
    this.userService.deleteUser(this.userId).subscribe(() => {
      this.userService.logout()
    })
  }

}

