import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {SignupComponent} from "../signup/signup.component";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorDialogComponent} from "../../error-dialog/error-dialog.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  hide = true;
  loginForm!: FormGroup
  errorMessage!: string

  constructor(private formBuilder: FormBuilder,
              public userService: UserService,
              private router: Router,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

  }

  onLogin(){
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    this.userService.loginUser(email, password)
    .subscribe(
      (response) => {
        let userId = response.userId.toString()
        let isAdmin = response.isAdmin.toString()
        localStorage.setItem('token', response.token)
        localStorage.setItem('isAdmin', isAdmin)
        localStorage.setItem('userId', userId)
        if (this.userService.isAuthenticated()) {
          this.router.navigate(['home'])
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message
        this.dialog.open(ErrorDialogComponent, {
          data: { errorMessage: this.errorMessage }
        })
      }
    )
  }

  openDialog(): void {
    this.dialog.open(SignupComponent);
  }

}
