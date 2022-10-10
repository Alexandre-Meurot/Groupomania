import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {HomeComponent} from "./components/home/home.component";
import {AccountFormComponent} from "./components/account-form/account-form.component";
import {UpdatePostComponent} from "./components/update-post/update-post.component";
import {AccountDetailComponent} from "./components/account-detail/account-detail.component";
import {AccountListComponent} from "./components/account-list/account-list.component";

const routes: Routes = [
  { path: 'authentification', component: LoginComponent },
  { path: 'account-detail', canActivate: [AuthGuard], component: AccountDetailComponent },
  { path: 'account-list', canActivate: [AuthGuard], component: AccountListComponent },
  { path: 'account-form', canActivate: [AuthGuard], component: AccountFormComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'update', canActivate: [AuthGuard], component: UpdatePostComponent },
  { path: '', pathMatch: "full", component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
