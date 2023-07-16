import { Injectable } from '@angular/core';
import { Comment } from './comment'; // './comment' dosyasından Comment modelini import ediyoruz
import { defaultcomments } from 'src/assets/defaultcomments'; // Varsayılan yorumları içeren dosyayı import ediyoruz

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = []; // Yorumlar dizisi
  constructor() { }

  getComments(): Comment[] {
    return this.comments;
  }

  setComments(): void {
    this.comments = defaultcomments; // Varsayılan yorumları ayarla
  }

  deleteComment($event: number) {
    this.comments = this.comments.filter((comment) => comment.commentId !== $event); // Belirtilen kimlik değerine sahip yorumu filtrele ve diziden çıkar
  }

  addComment(comment: Comment) {
    this.comments.push(comment); // Yorumu yorumlar dizisine ekle
  }
}
