import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Comment } from '../comment'; // '../comment' dosyasından Comment modelini import ediyoruz
import { CommentService } from '../comment.service'; // '../comment.service' dosyasından CommentService'i import ediyoruz
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PostService } from 'src/app/posts/post.service';
import { Post } from 'src/app/posts/post';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  comments: Comment[] = []; // Yorumlar dizisi
  posts: Post[] = []; // Post dizisi
  dataSource = new MatTableDataSource<Comment>(); // MatTableDataSource kullanarak veri kaynağı oluşturuyoruz
  displayedColumns: string[] = ['commentId', 'postId', 'userId', 'comment', 'creationDate', 'isConfirmed', 'transactions']; // Tablo sütunları
  totalItems: any;
  selectedPostId: any;

  constructor(
    private commentService: CommentService,
    private router: Router,
    private postService: PostService
  ) {
    if (this.postService.getPosts().length === 0) {
      this.postService.setPosts(); // CategoryService'ten kategorileri yükle
    }
    this.posts = this.postService.getPosts();
    this.getAllComments(); // Tüm yorumları al ve tabloyu güncelle
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllComments() {
    if (this.commentService.getComments().length === 0)
      this.commentService.setComments(); // Yorumları yükle
    this.comments = this.commentService.getComments(); // Yorumları al
    if (this.comments != undefined) {
      this.totalItems = this.comments.length;
      this.dataSource = new MatTableDataSource(this.comments); // Yorumları MatTableDataSource'a aktar
    }
  }

  handleDeleteClick($event: number) {
    this.commentService.deleteComment($event); // Yorumu sil
    this.comments = this.commentService.getComments(); // Yorumları al
    this.totalItems = this.comments.length;
    this.dataSource = new MatTableDataSource(this.comments); // Tabloyu güncelle
    this.dataSource.paginator = this.paginator;
  }

  handleDetailClick($event: number) {
    this.router.navigateByUrl(`/commentlist/${$event}`); // Yorum detayına yönlendir
  }

  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.value.trim().toLowerCase(); // Filtreleme işlemi
  }

  applyFilterPost(): void {
    this.dataSource = new MatTableDataSource(this.comments.filter(x => x.postId === Number(this.selectedPostId)));
    this.dataSource.paginator = this.paginator; // MatPaginator'ı güncelle
  }

  clearFilter() {
    this.selectedPostId = null;
    this.dataSource = new MatTableDataSource(this.commentService.getComments());
    this.dataSource.paginator = this.paginator; // MatPaginator'ı güncelle
  }
}
