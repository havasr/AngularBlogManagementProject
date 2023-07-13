import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];
constructor(private userService : UserService) {
  this.userService.setUsers();
this.users = this.userService.getUsers();
}



}
