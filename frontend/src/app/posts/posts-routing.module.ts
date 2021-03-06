import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NewPostComponent} from "./components/new-post/new-post.component";
import {SinglePostComponent} from "./components/single-post/single-post.component";
import {PostListComponent} from "./components/post-list/post-list.component";
import {AuthGuard} from "../core/guards/auth.guard";

const routes: Routes = [
  { path: 'create', component: NewPostComponent, canActivate: [AuthGuard] },
  { path: ':id', component: SinglePostComponent, canActivate: [AuthGuard] },
  { path: '', component: PostListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PostsRoutingModule {}
