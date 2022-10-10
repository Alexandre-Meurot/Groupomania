import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user.model";
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  users$!: Observable<User[]>

  constructor(private userService: UserService,
              private auth: AuthService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.users$ = this.userService.getAllUsers()
  }

  isAdmin() : boolean {
    return this.auth.getIsAdmin() == 'true';
  }

  onConfirmDialog(userId: number) {
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
}
