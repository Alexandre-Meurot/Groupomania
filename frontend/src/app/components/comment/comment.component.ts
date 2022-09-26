import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Output() refresh =new EventEmitter<void>()
  @Input() comment!: Comment | any;
  userId!: string | null;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
  }

  onDelete() {
    if (this.myOwnComment()) {
      this.commentService.deleteComment(this.comment.id).subscribe(() => {
        this.refresh.emit()
      })
    }
  }

  myOwnComment(): boolean {
    return this.userId == this.comment.userId;
  }

}
