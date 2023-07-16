import { Component } from '@angular/core';
import { Post } from 'src/app/posts/post'; // 'src/app/posts/post' dosyasından Post modelini import ediyoruz
import { User } from 'src/app/user/user'; // 'src/app/user/user' dosyasından User modelini import ediyoruz
import { Comment } from '../comment'; // '../comment' dosyasından Comment modelini import ediyoruz
import { UserService } from 'src/app/user/user.service'; // 'src/app/user/user.service' dosyasından UserService'i import ediyoruz
import { PostService } from 'src/app/posts/post.service'; // 'src/app/posts/post.service' dosyasından PostService'i import ediyoruz
import { CommentService } from '../comment.service'; // '../comment.service' dosyasından CommentService'i import ediyoruz
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent {
  users: User[] = []; // Kullanıcılar dizisi
  posts: Post[] = []; // Gönderiler dizisi
  comments: Comment[] = []; // Yorumlar dizisi
  comment: Comment = {
    commentId: 0,
    postId: 0,
    userId: 0,
    comment: "",
    creationDate: "",
    isConfirmed: false,
  }; // Yorum nesnesi

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private router: Router
  ) {
    if (this.userService.getUsers().length === 0) {
      this.userService.setUsers(); // UserService'ten kullanıcıları yükle
    }
    if (this.postService.getPosts().length === 0) {
      this.postService.setPosts(); // PostService'ten gönderileri yükle
    }
    if (this.commentService.getComments().length === 0) {
      this.commentService.setComments(); // CommentService'ten yorumları yükle
    }
    this.users = this.userService.getUsers(); // Kullanıcıları al
    this.posts = this.postService.getPosts(); // Gönderileri al
    this.comments = this.commentService.getComments(); // Yorumları al
  }

  handleSaveClick() {
    if (
      this.comment.postId === 0 ||
      this.comment.userId === 0 ||
      this.comment.creationDate === "" ||
      this.comment.comment === ""
    ) {
      alert("You must fill every section"); // Tüm alanların doldurulması gerektiğini bildiren uyarı mesajı göster
    } else {
      this.comment.commentId = this.comments[this.comments.length - 1].commentId + 1; // Yeni yorum kimliğini son yorumun kimliğine bir ekleyerek belirle
      this.comment.postId = Number(this.comment.postId);
      this.comment.userId = Number(this.comment.userId);
      this.commentService.addComment(this.comment); // Yorum ekleme işlemini yap
      this.router.navigateByUrl("/commentlist"); // 'commentlist' yoluna yönlendir
    }
  }

  handleCancelClick() {
    this.router.navigateByUrl("/commentlist"); // 'commentlist' yoluna yönlendir
  }
}
