import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../services/comment.service";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  commentForm!: FormGroup
  @Input() postId!: number
  @Output() refresh = new EventEmitter<void>()
  loading!: boolean

  constructor(private formBuilder: FormBuilder,
              private commentService: CommentService) { }

  ngOnInit(): void {

    this.loading = false

    this.commentForm = this.formBuilder.group({
      content: [null, [Validators.minLength(3), Validators.maxLength(50), Validators.required]]
    })

  }

  onAddComment() {
    console.log(this.commentForm.value)
    this.loading = true
    this.commentService.createComment(this.commentForm.value, this.postId)
      .subscribe(() => {
        this.commentForm.reset()
        this.commentForm.markAsPristine()
        this.refresh.emit()
        this.loading = false
      })
  }

}
