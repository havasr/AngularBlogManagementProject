import { Component } from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent {
  comments: Comment[] = [];
  pagedData: Comment[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private commentService: CommentService, private router: Router) {
    if (this.commentService.getComments().length === 0)
      this.commentService.setComments();
    this.comments = this.commentService.getComments();
  }

  handleDetailClick($event: number) {
    this.router.navigate(['/commentlist/', $event]);
  }

  handleDeleteClick($event: number) {
    this.commentService.deleteComment($event);
    this.comments = this.commentService.getComments();
    this.pageChanged(this.currentPage);
  }

  ngOnInit() {
    this.pageChanged(this.currentPage);
  }

  pageChanged(page: number): void {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedData = this.comments.slice(startIndex, endIndex);
    this.currentPage = page;
    if (this.pagedData.length === 0 && this.currentPage > 1) {
      this.previousPage();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged(this.currentPage);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.comments.length / this.itemsPerPage);
  }
}
