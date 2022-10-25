import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-form-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  users$!: Observable<User[]>
  myUserId = localStorage.getItem('userId')

  constructor(private userService: UserService,
              private auth: AuthService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.users$ = this.userService.getAllUsers()
  }

  isAdmin(): boolean {
    return this.auth.getIsAdmin() == 'true';
  }

  myOwnAccount(userId: number): boolean {
    if (this.myUserId) {
      return +this.myUserId === userId;
    } else {
      return false
    }
  }

  onConfirmDialog(userId: any) {
    console.log(userId)
    const dialogRef = this.dialog.open(ConfirmDialogComponent)
    dialogRef.afterClosed().subscribe(formData => {
      if (!formData) {
        return 'Suppression annulée !'
      }
      this.userService.deleteUser(userId)
        .subscribe(() => {
          this.userService.logout()
        })
      return 'Suppression confirmée !'
    })
  }

  toAccount(userId: number) {
    this.router.navigate(['account-detail'], { queryParams: {id: userId} })
  }

  toUpdateAccount() {
    this.router.navigate(['account-form'])
  }
}
