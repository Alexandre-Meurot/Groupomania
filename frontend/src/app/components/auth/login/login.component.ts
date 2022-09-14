import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {SignupComponent} from "../signup/signup.component";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  hide = true;
  loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private http: HttpClient,
              public dialog: MatDialog,) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onLogin(){
    console.log(this.loginForm.value);
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    this.userService.loginUser(email, password)
  }

  getErrorMessages() {
  }

  openDialog(): void {
    this.dialog.open(SignupComponent);
  }

}
