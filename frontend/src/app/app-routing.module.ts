import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {HomeComponent} from "./components/home/home.component";
import {AccountComponent} from "./components/account/account.component";
import {AddPostComponent} from "./components/add-post/add-post.component";

const routes: Routes = [
  { path: 'authentification', component: LoginComponent },
  { path: 'account', canActivate: [AuthGuard], component: AccountComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'create', canActivate: [AuthGuard], component: AddPostComponent },
  { path: '', pathMatch: "full", component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
