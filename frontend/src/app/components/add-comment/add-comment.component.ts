import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  commentForm!: FormGroup
  @Input() postId!: number

  constructor(private formBuilder: FormBuilder,
              private commentService: CommentService) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: [null, [Validators.minLength(3), Validators.maxLength(50), Validators.required]]
    })

  }

  onAddComment() {
    console.log(this.commentForm.value)
    this.commentService.createComment(this.commentForm.value, this.postId).subscribe()
  }

}
