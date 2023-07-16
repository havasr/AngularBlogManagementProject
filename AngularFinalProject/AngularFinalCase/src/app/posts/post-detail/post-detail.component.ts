import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Post } from '../post'; // '../post' dosyasından Post modelini import ediyoruz
import { PostService } from '../post.service'; // '../post.service' dosyasından PostService'i import ediyoruz
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service'; // 'src/app/user/user.service' dosyasından UserService'i import ediyoruz
import { User } from 'src/app/user/user'; // 'src/app/user/user' dosyasından User modelini import ediyoruz
import { Category } from 'src/app/category/category'; // 'src/app/category/category' dosyasından Category modelini import ediyoruz
import { CategoryService } from 'src/app/category/category.service'; // 'src/app/category/category.service' dosyasından CategoryService'i import ediyoruz
import { CommentService } from 'src/app/comments/comment.service';
import { Comment } from 'src/app/comments/comment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  posts: Post[] = []; // Yazılar dizisi
  post: Post = {
    postId: 0,
    userId: 0,
    categoryId: 0,
    title: "",
    content: "",
    viewCount: 0,
    creationDate: "",
    isPublished: false
  }; // Görüntülenen yazıyı temsil eden Post nesnesi
  users: User[] = []; // Kullanıcılar dizisi
  categories: Category[] = []; // Kategoriler dizisi
  comments: Comment[] = []; // Yorumlar dizisi
  editMode: Boolean = false; // Düzenleme modu
  dataSource = new MatTableDataSource<Comment>(); // MatTableDataSource kullanarak veri kaynağı oluşturuyoruz
  displayedColumns: string[] = ['commentId', 'postId', 'userId', 'comment', 'creationDate', 'isConfirmed']; // Tablo sütunları
  totalItems: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private categoryService: CategoryService,
    private commentService: CommentService
  ) {
    this.categoryService.setCategories(); // CategoryService üzerinden kategorileri ayarla
    this.categories = this.categoryService.getCategories(); // Kategorileri al al
    if (this.userService.getUsers().length === 0) {
      this.userService.setUsers(); // UserService üzerinden kullanıcıları ayarla
    }
    this.users = this.userService.getUsers(); // Kullanıcıları al
    if (this.categoryService.getCategories().length === 0) {
      this.categoryService.setCategories(); // CategoryService üzerinden kategorileri ayarla
    }
    this.categories = this.categoryService.getCategories(); // Kategorileri al
    if (this.commentService.getComments().length === 0) {
      this.commentService.setComments(); // CommentService üzerinden yorumları ayarla
    }
    if (this.postService.getPosts().length === 0) {
      this.postService.setPosts(); // PostService üzerinden yazıları ayarla
    }
    this.posts = this.postService.getPosts(); // Yazıları al
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']; // Route parametresinden yazı kimliğini al
      if (this.commentService.getComments().length === 0) {
        this.commentService.setComments();
      }
      this.comments = this.commentService.getComments().filter(comment => comment.postId === Number(id));
      this.dataSource = new MatTableDataSource(this.comments);
      this.post = this.posts.find(post => post.postId === Number(id))!; // Yazıyı bul
      if (this.post == undefined) {
        alert("An error occurred while retrieving post information."); // Hata mesajı göster
        this.router.navigateByUrl("/postlist"); // Yazı listesine yönlendir
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handleSaveClick() {
    this.postService.updatePost(this.post); // Yazıyı güncelle
    this.router.navigateByUrl('/postlist'); // Yazı listesine yönlendir
  }

  handleDeleteClick() {
   if (this.checkComments(this.post.postId) === true) {
      // Gönderiye ait yorum varsa
      alert("You cannot delete a post with comment"); // Uyarı mesajı göster
    } else {
      this.postService.deletePost(this.post.postId); // Yazıyı sil
      this.router.navigateByUrl('/postlist'); // Yazı listesine yönlendir
    }
  }

  handleEditClick() {
    this.editMode = !this.editMode; // Düzenleme modunu değiştir
  }

  checkComments(id: number): boolean {
    // Verilen gönderi idsine sahip  yorumlar varsa true, yoksa false döndürür
    if (this.commentService.getComments().filter((comment) => Number(comment.postId) === Number(id)).length !== 0) {
      return true;
    } else {
      return false;
    }
  }
}
