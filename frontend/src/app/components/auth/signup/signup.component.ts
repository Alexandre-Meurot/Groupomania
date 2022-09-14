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
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    },
      {
      validators: this.Mustmatch('password','passwordConfirmation')
      }
    )

  }


  onSignUp() {
    console.log(this.signUpForm.value)
    this.userService.createUser(this.signUpForm.value)
      .subscribe()
  }

  get f() {
    return this.signUpForm.controls;
  }

  Mustmatch(password: any, passwordConfirmation: any) {

    return(formgroup: FormGroup) => {

      const passwordControl = formgroup.controls[password]
      const passwordConfirmationControl = formgroup.controls[passwordConfirmation]

      if (passwordConfirmationControl.errors && !passwordConfirmationControl.errors['Mustmatch']) {
        return;
      }

      if (passwordControl.value !== passwordConfirmationControl.value) {
        passwordConfirmationControl.setErrors({ Mustmatch: true })
      } else {
        passwordConfirmationControl.setErrors(null)
      }
    }
  }



}
