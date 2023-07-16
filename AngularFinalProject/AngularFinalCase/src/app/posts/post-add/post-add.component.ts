import { Component, Inject, OnInit } from '@angular/core';
import { Post } from '../post'; // '../post' dosyasından Post modelini import ediyoruz
import { PostService } from '../post.service'; // '../post.service' dosyasından PostService'i import ediyoruz
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service'; // 'src/app/user/user.service' dosyasından UserService'i import ediyoruz
import { User } from 'src/app/user/user'; // 'src/app/user/user' dosyasından User modelini import ediyoruz
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  post: Post = {
    postId: 0,
    userId: 0,
    categoryId: 0,
    title: "",
    content: "",
    viewCount: 0,
    creationDate: "",
    isPublished: false
  }; // Yeni eklenen yazıyı temsil eden Post nesnesi

  users: User[] = []; // Kullanıcılar dizisi
  categories: Category[] = []; // Kategoriler dizisi
  posts: Post[] = []; // Yazılar dizisi

  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService
  ) {
    this.userService.setUsers(); // UserService üzerinden kullanıcıları ayarla
    this.users = this.userService.getUsers(); // Kullanıcıları al
    this.categoryService.setCategories(); // CategoryService üzerinden kategorileri ayarla
    this.categories = this.categoryService.getCategories(); // Kategorileri al al
    if (this.postService.getPosts().length === 0)
      this.postService.setPosts(); // PostService üzerinden yazıları ayarla
    this.posts = this.postService.getPosts(); // Yazıları al
  }

  ngOnInit() {
  }

  handleSaveClick() {
    this.post.postId = this.posts[this.posts.length - 1].postId + 1; // Yeni yazıya bir kimlik değeri atanıyor
    this.post.categoryId = Number(this.post.categoryId);
    this.post.userId = Number(this.post.userId);
    this.postService.addPost(this.post); // Yazıyı ekle
    this.posts = this.postService.getPosts(); // Güncellenmiş yazıları al
    this.router.navigateByUrl('/postlist'); // Yazı listesine yönlendir
  }

  handleCancelClick() {
    this.router.navigateByUrl("/postlist"); // İptal butonuna tıklandığında yazı listesine yönlendir
  }
}
