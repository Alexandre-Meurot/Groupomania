import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {Observable} from "rxjs";
import {Comment} from "../../models/comment.model";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() post!: Post
  comments$!: Observable<Comment[]>

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {

    this.comments$ = this.commentService.getAllComments(this.post.id)
  }

}
