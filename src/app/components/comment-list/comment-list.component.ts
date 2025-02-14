import {Component, OnInit} from '@angular/core';
import {Comment} from "../../interfaces/comment";
import {CommentService} from "../../services/comment.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: Comment[];

  constructor(private commentService: CommentService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.commentService.getComments(this.activatedRoute.snapshot.params['id']).subscribe(
      (data: Comment[]) => {
        this.comments = data;
      }
    )
  }
}
