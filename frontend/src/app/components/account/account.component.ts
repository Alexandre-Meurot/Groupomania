import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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


  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.updateForm = this.formBuilder.group({
      email: [this.user?.email, Validators.email],
      username: [this.user?.username, [Validators.minLength(3), Validators.maxLength(20)]],
      bio: [this.user?.bio, [Validators.minLength(10), Validators.maxLength(200)]],
      picture: [this.user?.picture, Validators.pattern(this.urlRegex)]
    })

    this.userService.getUserById(this.userId)
      .subscribe(user => this.user = user)

  }

  onDelete() {
    this.userService.deleteUser(this.userId).subscribe(() => {
      this.userService.logout()
    })
  }

  onUpdate() {
    console.log(this.updateForm.value)
    console.log(this.user)
    this.userService.updateUser(this.user)
      .subscribe()
  }

}
