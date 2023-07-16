import { Component } from '@angular/core';
import { Comment } from '../comment'; // '../comment' dosyasından Comment modelini import ediyoruz
import { CommentService } from '../comment.service'; // '../comment.service' dosyasından CommentService'i import ediyoruz
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent {
  comments: Comment[] = []; // Yorumlar dizisi
  comment: Comment = {
    commentId: 0,
    postId: 0,
    userId: 0,
    comment: "",
    creationDate: "",
    isConfirmed: false
  }; // Yorum nesnesi

  constructor(
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.comments = this.commentService.getComments(); // Yorumları al
      if (this.comments.length === 0) {
        this.commentService.setComments(); // CommentService'ten yorumları yükle
        this.comments = this.commentService.getComments(); // Yorumları al
      }
      const id = params['id']; // URL parametresinden yorum kimliğini al
      this.comment = this.comments.find(comment => comment.commentId === Number(id))!; // Belirtilen kimliğe sahip yorumu bul ve atar
    });
  }
}
