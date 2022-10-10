import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from "@angular/common";
import * as fr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import { SignupComponent } from './components/auth/signup/signup.component';
import {MatDialogModule} from "@angular/material/dialog";
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {httpInterceptorProviders} from "./interceptors";
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { AccountComponent } from './components/account/account.component';
import {MatDividerModule} from "@angular/material/divider";
import { AddPostComponent } from './components/add-post/add-post.component';
import {MaterialFileInputModule} from "ngx-material-file-input";
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    PostComponent,
    PostListComponent,
    AccountComponent,
    AddPostComponent,
    CommentComponent,
    AddCommentComponent,
    CommentListComponent,
    UpdatePostComponent,
    AccountDetailComponent,
    AccountListComponent,
    ConfirmDialogComponent,
    FooterComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule,
        MatCardModule,
        MatDialogModule,
        MatToolbarModule,
        MatDividerModule,
        MaterialFileInputModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatMenuModule,
    ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default)
  }
}
