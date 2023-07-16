import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { PostService } from 'src/app/posts/post.service';
import { CommentService } from 'src/app/comments/comment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<User>();

  users: User[] = [];

  // Form alanında kullanılan değişkenler tanımlanıyor
  username: string = "";
  email: string = "";
  creationDate: string = "";
  isActive: boolean = false;
  editMode: boolean = false;
  userId: number = 0;
  totalItems: any;
  displayedColumns: string[] = ['userId', 'username', 'email', 'creationDate', 'isActive', 'transactions'];

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private router: Router
  ) {
    this.getAllUsers();

    // Gerekli servislerin verileri set etmesi sağlanıyor
    if (this.postService.getPosts().length === 0)
      this.postService.setPosts();
    if (this.commentService.getComments().length === 0)
      this.commentService.setComments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllUsers() {
    if (this.userService.getUsers().length === 0)
      this.userService.setUsers();
    this.users = this.userService.getUsers();

    if (this.users != undefined) {
      this.totalItems = this.users.length;
      this.dataSource = new MatTableDataSource(this.users);
    }
  }

  // Son kullanıcı kalması durumunda hata mesajı gösteriliyor
  handleDeleteClick($event: number) {
    if (this.userService.userCount() === 1)
      alert("You cannot delete the last user.");
    else if (this.checkPostsAndComments($event) === true)
      alert("You cannot delete a user with posts or comments.");
    else {
      this.userService.deleteUser($event);
      this.users = this.userService.getUsers();
      this.totalItems = this.users.length;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    }
  }

  // Bir kullanıcının yazıları ve yorumları kontrol ediliyor
  checkPostsAndComments(id: number): boolean {
    if (this.postService.getPosts().filter((post) => post.userId === id).length !== 0)
      return true;
    else if (this.commentService.getComments().filter((comment) => comment.userId === id).length !== 0)
      return true;
    else
      return false;
  }

  handleDetailClick($event: number): void {
    this.router.navigate(["/userlist/", $event]);
  }

  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
}
