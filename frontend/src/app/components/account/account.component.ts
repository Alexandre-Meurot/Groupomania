import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  userId: number = Number(this.userService.getUserId())
  user!: User | undefined

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUserById(this.userId)
      .subscribe(user => this.user = user)

  }

}
