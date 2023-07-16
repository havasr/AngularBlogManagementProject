import { Injectable } from '@angular/core';
import { User } from './user';
import { defaultusers } from 'src/assets/defaultusers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = []; // Kullanıcıların tutulduğu dizi

  constructor() { }

  getUsers(): User[] {
    return this.users; // Kullanıcıları döndüren metot
  }

  setUsers(): void {
    this.users = defaultusers; // Kullanıcıları varsayılan kullanıcılarla dolduran metot
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.userId !== id); // Belirtilen ID'ye sahip kullanıcıyı silen metot
  }

  findUserById(id: number): User | undefined {
    return this.users.find((user) => user.userId === Number(id)); // Belirtilen ID'ye sahip kullanıcıyı bulan metot
  }

  findUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username); // Belirtilen kullanıcı adına sahip kullanıcıyı bulan metot
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email); // Belirtilen e-posta adresine sahip kullanıcıyı bulan metot
  }

  userCount(): number {
    return this.users.length; // Kullanıcı sayısını döndüren metot
  }

  editUser(editedUser: User, id: number): void {
    this.users = this.users.map(user => {
      if (user.userId === id)
        user = editedUser; // Belirtilen ID'ye sahip kullanıcının bilgilerini güncelleyen metot
      return user;
    });
  }

  addUser(user: User): void {
    this.users.push(user); // Yeni bir kullanıcı ekleyen metot
  }

  // Kullanıcı adı ve e-posta adresi benzersiz olmalı
  checkUnique(username: string, email: string, id: number): boolean {
    if (this.users.find((user) => user.username === username.toLowerCase()) !== undefined
      && this.findUserByUsername(username.toLowerCase())!.userId !== id)
      return false; // Kullanıcı adı daha önce kullanılmışsa ve belirtilen ID'ye sahip kullanıcıya ait değilse false döner
    else if (this.users.find((user) => user.email === email.toLowerCase()) !== undefined
      && this.findUserByEmail(email.toLowerCase())!.userId !== id)
      return false; // E-posta adresi daha önce kullanılmışsa ve belirtilen ID'ye sahip kullanıcıya ait değilse false döner
    else
      return true; // Kullanıcı adı ve e-posta adresi benzersizse true döner
  }
}
