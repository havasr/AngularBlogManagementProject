import { Component } from '@angular/core';
import { User } from '../user'; // '../user' dosyasından User modelini import ediyoruz
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service'; // '../user.service' dosyasından UserService'i import ediyoruz
import { PostService } from 'src/app/posts/post.service'; // 'src/app/posts/post.service' dosyasından PostService'i import ediyoruz
import { CategoryService } from 'src/app/category/category.service'; // 'src/app/category/category.service' dosyasından CategoryService'i import ediyoruz
import { Category } from 'src/app/category/category'; // 'src/app/category/category' dosyasından Category modelini import ediyoruz
import { Post } from 'src/app/posts/post'; // 'src/app/posts/post' dosyasından Post modelini import ediyoruz
import { CommentService } from 'src/app/comments/comment.service'; // 'src/app/comments/comment.service' dosyasından CommentService'i import ediyoruz

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  users: User[] = []; // Kullanıcılar dizisi
  user: User = {
    userId: 0,
    creationDate: "",
    email: "",
    isActive: false,
    username: ""
  }; // Seçili kullanıcı nesnesi
  editMode: Boolean = false; // Düzenleme modu durumu
  categories: Category[] = []; // Kategoriler dizisi
  posts: Post[] = []; // Gönderiler dizisi

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private categoryService: CategoryService,
    private commentService: CommentService
  ) {
    if (this.userService.getUsers().length === 0) { // Kullanıcılar henüz yüklenmediyse
      this.userService.setUsers(); // UserService'ten kullanıcıları yükle
    } else {
      this.users = this.userService.getUsers(); // Kullanıcılar zaten yüklendiyse UserService'ten kullanıcıları al
    }

    if (this.categoryService.getCategories().length === 0) { // Kategoriler henüz yüklenmediyse
      this.categoryService.setCategories(); // CategoryService'ten kategorileri yükle
    } else {
      this.categories = this.categoryService.getCategories(); // Kategoriler zaten yüklendiyse CategoryService'ten kategorileri al
    }

    if (this.postService.getPosts().length === 0) { // Gönderiler henüz yüklenmediyse
      this.postService.setPosts(); // PostService'ten gönderileri yükle
    }
    this.posts = this.postService.getPosts(); // Gönderiler zaten yüklendiyse PostService'ten gönderileri al
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (this.users.length === 0) { // Kullanıcılar henüz yüklenmediyse
        this.userService.setUsers(); // UserService'ten kullanıcıları yükle
        this.users = this.userService.getUsers(); // Kullanıcılar zaten yüklendiyse UserService'ten kullanıcıları al
      }
      const id = params['id']; // Yönlendirme parametresinden kullanıcı kimliğini al
      this.user = this.users.find(user => user.userId === Number(id))!; // Kullanıcı kimliğine göre ilgili kullanıcıyı bul ve atama yap
    });
  }

  handleSaveClick() {
    if (this.user.username == '' || this.user.email == '' || this.user.creationDate == '') { // Kullanıcı adı, e-posta veya oluşturma tarihi boşsa
      alert("All the empty spaces must be filled."); // Uyarı mesajı göster
    } else if (this.userService.checkUnique(this.user.username, this.user.email, this.user.userId) === false) {
      // Kullanıcı adı veya e-posta başka kullanıcılarla benzersiz değilse
      alert("Username and email must be unique from others."); // Uyarı mesajı göster
    } else {
      this.userService.editUser(this.user, this.user.userId); // UserService üzerinden kullanıcı düzenlemesini yap
      this.router.navigateByUrl('/userlist'); // 'userlist' yoluna yönlendir
    }
  }

  handleDeleteClick() {
    if (this.userService.userCount() === 1) { // Eğer kullanıcı sayısı 1 ise (son kullanıcı)
      alert("You can not delete last users."); // Uyarı mesajı göster
    } else if (this.checkPostsAndComments(this.user.userId) === true) {
      // Kullanıcının gönderileri veya yorumları varsa
      alert("You cannot delete a user with post or comment"); // Uyarı mesajı göster
    } else {
      this.userService.deleteUser(this.user.userId); // UserService üzerinden kullanıcı silme işlemini yap
      this.router.navigateByUrl('/userlist'); // 'userlist' yoluna yönlendir
    }
  }

  checkPostsAndComments(id: number): boolean {
    // Verilen kullanıcı kimliğine sahip gönderiler veya yorumlar varsa true, yoksa false döndürür
    if (this.postService.getPosts().filter((post) => post.userId === id).length !== 0) {
      return true;
    } else if (this.commentService.getComments().filter((comment) => comment.userId === id).length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  handleEditClick() {
    this.editMode = !this.editMode; // Düzenleme modunu tersine çevir
  }
}
