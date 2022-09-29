import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
