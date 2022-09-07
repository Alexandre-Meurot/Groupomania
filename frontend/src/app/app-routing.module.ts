import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  { path: '', pathMatch: "full", component: LoginComponent },
  { path: 'authentification', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
