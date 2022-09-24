import {Injectable} from "@angular/core";
import {PostService} from "./post.service";

@Injectable({
  providedIn: "root"
})

export class CommentService {

  constructor(postService: PostService) { }

  getAllComments() {

  }

  createComment() {

  }

  deleteComment() {

  }

}
