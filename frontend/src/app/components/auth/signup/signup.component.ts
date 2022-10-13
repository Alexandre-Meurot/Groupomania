import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorDialogComponent} from "../../error-dialog/error-dialog.component";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  hide2 = true;
  signUpForm!: FormGroup;
  passwordRegex!: RegExp
  errorMessage!: string

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    // 8 caractères : 1 majuscule et 1 chiffre
    this.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.minLength(3), Validators.maxLength(15)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      passwordConfirmation: ['', Validators.required],
    },
      {
      validators: this.authService.Mustmatch('password','passwordConfirmation')
      }
    )

  }

  onSignUp() {
    this.userService.createUser(this.signUpForm.value).subscribe(() => {
      this.router.navigate(['authentification'])
      this.dialog.closeAll()
    }, (error: HttpErrorResponse) => {
      this.errorMessage = error.error.message
      this.dialog.open(ErrorDialogComponent, {
        data: { errorMessage: this.errorMessage }
      })
    })
  }

  get f() {
    return this.signUpForm.controls;
  }

}
