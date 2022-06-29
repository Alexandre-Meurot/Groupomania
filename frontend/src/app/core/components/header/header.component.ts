import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // injection du routeur
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // méthode d'ajout d'un nouveau post - redirection vers le composant new-post
  onAddNewPost(): void {
    this.router.navigateByUrl('/create')
  }

}
