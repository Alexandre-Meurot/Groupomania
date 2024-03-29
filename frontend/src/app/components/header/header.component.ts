import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService,
              public userService: UserService) { }

  ngOnInit(): void {}

  toAccount() {
    this.router.navigate(['account-form'])
  }

  toHome() {
    this.router.navigate(['home'])
  }

  toAccountList() {
    this.router.navigate(['account-list'])
  }

  onLogout() {
    this.userService.logout()
  }

  isAdmin() : boolean {
    return this.auth.getIsAdmin() == 'true';
  }


}
