import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  category: Category = {
    categoryId: 0,
    name: "",
    creationDate: ""
  };

  users: User[] = [];
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private userService: UserService
  ) {
    this.userService.setUsers(); // UserService'ten kullanıcıları yükle
    this.users = this.userService.getUsers(); // Kullanıcıları al

    if (this.categoryService.getCategories().length === 0) { // Kategoriler henüz yüklenmediyse
      this.categoryService.setCategories(); // CategoryService'ten kategorileri yükle
    }

    this.categories = this.categoryService.getCategories(); // Kategorileri al
  }

  ngOnInit() {
  }

  handleSaveClick() {
    this.category.categoryId = this.categories[this.categories.length - 1].categoryId + 1;
    // Kategori kimliğini, mevcut kategorilerin en son kimliğine bir ekleyerek belirle
    this.categoryService.addCategory(this.category.name, this.category.creationDate);
    // CategoryService üzerinden yeni bir kategori eklemesini yap
    this.categories = this.categoryService.getCategories(); // Kategorileri al
    this.router.navigateByUrl('/categorylist'); // 'categorylist' yoluna yönlendir
  }

  handleCancelClick() {
    this.router.navigateByUrl("/categorylist"); // 'categorylist' yoluna yönlendir
  }
}
