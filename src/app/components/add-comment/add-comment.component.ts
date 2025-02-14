import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {CityService} from "../../services/city.service";
import {CommentService} from "../../services/comment.service";
import {CommentRequest} from "../../interfaces/comment-request";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
  addCommentForm = this.fb.group({
    comment: ['']
  });


  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {

  }

  get comment() {
    return this.addCommentForm.controls['comment'];
  }

  submitComment() {
    const postData = {...this.addCommentForm.value};

    this.commentService.addComment({
      content: postData.comment,
      fitnessProgramId: this.activatedRoute.snapshot.params['id']
    } as CommentRequest, this.activatedRoute.snapshot.params['id']).subscribe(
      (data) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Comment successfully added'});
        window.location.reload();
      }
    );
  }

  isUserLoggedIn() {
    return sessionStorage.getItem("username") !== null;
  }
}
