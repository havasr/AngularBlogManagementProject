import { Component } from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent {
  comments: Comment[] = [];
  comment: Comment = {
    commentId: 0,
    postId: 0,
    userId: 0,
    comment: "",
    creationDate: "",
    isConfirmed: false
  };

  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute){

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.comments = this.commentService.getComments();
      const id = params['id'];
      this.comment = this.comments.find(comment => comment.commentId === Number(id))!;
    });
  }

}
