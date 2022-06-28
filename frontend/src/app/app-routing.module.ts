import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PostListComponent} from "./post-list/post-list.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SinglePostComponent} from "./single-post/single-post.component";
import {NewPostComponent} from "./new-post/new-post.component";

const routes: Routes = [
  { path: 'create', component: NewPostComponent },
  { path: 'posts/:id', component: SinglePostComponent },
  { path: 'posts', component: PostListComponent },
  { path: '', component: LandingPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
