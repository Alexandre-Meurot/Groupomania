import {Component, Input, OnInit} from '@angular/core';
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
              private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.userService.isAuthenticated())
  }

  toAccount() {
    this.router.navigate(['account'])
  }

  toHome() {
    this.router.navigate(['home'])
  }

  isAdmin() : boolean {
    return this.auth.getIsAdmin() == 'true';
  }

  onLogout() {
    this.userService.logout()
  }

  isConnected(): boolean  {
    return this.userService.isAuthenticated();
  }

}
