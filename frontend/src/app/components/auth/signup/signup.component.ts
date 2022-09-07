import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  signUpForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSignUp() {
    console.log(this.signUpForm.value)
    this.userService.createUser(this.signUpForm.value)
      .subscribe()
  }

}
