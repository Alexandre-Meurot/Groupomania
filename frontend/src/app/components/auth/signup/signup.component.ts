import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
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
      validators: this.Mustmatch('password','passwordConfirmation')
      }
    )

  }


  onSignUp() {
    this.userService.createUser(this.signUpForm.value).subscribe()
    this.router.navigate(['authentification'])
    this.dialog.closeAll()
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
