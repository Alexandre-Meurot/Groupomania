import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
  }

  // méthode d'inscription => renvoi vers la page de connexion
  onSignup() {
    this.auth.login();
    this.router.navigateByUrl('auth/login');
  }

}
