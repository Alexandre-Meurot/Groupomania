import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-account-form-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  userId!: string
  currentUserId!: string | null
  user!: User

  constructor(private activated: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.activated.queryParams.subscribe(
      params => {
        this.userId = params['id']
      })
    this.userService.getUserById(+this.userId)
      .subscribe(user => this.user = user)

    this.currentUserId = localStorage.getItem('userId')

  }

  myOwnAccount() {
    return this.currentUserId == this.userId
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') == 'true';
  }

  toUpdate() {
    this.router.navigate(['account-form'])
  }

  onConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent)
    dialogRef.afterClosed().subscribe(formData => {
      if (!formData) {
        return 'Suppression annulée !'
      }
      this.userService.deleteUser(+this.userId)
        .subscribe(() => {
          this.router.navigate(['home'])
        })
      return 'Suppression confirmée !'
    })
  }

  toHome() {
    this.router.navigate(['home'])
  }

  toUpgrade() {
    this.userService.updateRights(+this.userId, 1).subscribe(() => {
      this.userService.getUserById(+this.userId)
        .subscribe(user => this.user = user)
    })
  }

  toDisgress() {
    this.userService.updateRights(+this.userId, 0).subscribe(() => {
      this.userService.getUserById(+this.userId)
        .subscribe(user => this.user = user)
    })
  }
}
