import { Injectable } from '@angular/core';
import { User } from './user';
import { defaultusers } from 'src/assets/defaultusers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = []
  constructor() { }

  getUsers(): User[] {
return this.users;
  }

  setUsers(): void {
    this.users = defaultusers;
  }
}
