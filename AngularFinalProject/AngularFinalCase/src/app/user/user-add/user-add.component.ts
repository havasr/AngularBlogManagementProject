import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

  // Yeni bir kullanıcı nesnesi oluşturuldu ve tipi belirlendi
  user: User = {
    userId: 0,
    username: "",
    email: "",
    creationDate: "",
    isActive: false
  }

  constructor(private userService: UserService, private router: Router) {
    // userService üzerinden getUsers fonksiyonu kullanılarak kullanıcı verileri alınıyor
    if (this.userService.getUsers().length === 0)
      this.userService.setUsers();
  }

  // Yeni bir kullanıcı oluşturmak için kullanılan fonksiyon
  handleCreateClick() {
    // Kullanıcının userId'si, mevcut kullanıcıların en son userId'sine 1 eklenerek belirlenir
    this.user.userId = this.userService.getUsers()[this.userService.userCount() - 1].userId + 1;

    // Boş alanlar kontrol ediliyor
    if (this.user.username === "" || this.user.email === "" || this.user.creationDate === "")
      alert("Fill the empty spaces.");

    // Kullanıcının benzersiz olup olmadığı kontrol ediliyor
    else if (this.userService.checkUnique(this.user.username, this.user.email, this.user.userId) === false)
      alert("This user already exists.");

    // Kullanıcı ekleniyor ve kullanıcı listesine yönlendiriliyor
    else {
      this.userService.addUser(this.user);
      this.router.navigateByUrl('/userlist');
    }
  }

  // İşlem iptal edildiğinde kullanıcı listesine yönlendiriliyor
  handleCancelClick() {
    this.router.navigateByUrl("/userlist");
  }
}
