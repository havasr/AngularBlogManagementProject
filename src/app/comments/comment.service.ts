import { Injectable } from '@angular/core';
import { Comment } from './comment';
import { defaultcomments } from 'src/assets/defaultcomments';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private comments: Comment[] = [];
  constructor() {}

  getComments(): Comment[] {
    return this.comments;
  }

  setComments(): void {
    this.comments = defaultcomments;
  }

  deleteComment($event: number) {
    this.comments = this.comments.filter(
      (comment) => comment.commentId !== $event
    );
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
  }
}
