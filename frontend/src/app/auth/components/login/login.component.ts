import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  // méthode de connexion => renvoi vers la page "posts"
  onLogin(): void {
    this.auth.login();
    this.router.navigateByUrl('/posts');
  }

  // méthode de renvoi vers la page "inscription"
  onSignup(): void {
    this.router.navigateByUrl('auth/signup');
  }

}
