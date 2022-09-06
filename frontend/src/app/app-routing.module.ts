import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";

const routes: Routes = [
  { path: 'authentification', component: LoginComponent },
  { path: '', pathMatch: "full", component: LoginComponent },
  { path: '**', redirectTo: 'authentification' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
