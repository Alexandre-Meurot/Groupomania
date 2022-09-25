import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: Comment | any

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {}

  onDelete() {
    this.commentService.deleteComment(this.comment.id).subscribe()
  }

}
