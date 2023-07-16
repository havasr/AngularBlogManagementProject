import { Component } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { PostService } from 'src/app/posts/post.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  categories: Category[] = [];
  pagedData: Category[] = [];
  newCategoryName: string = '';
  newCategoryDate: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  addCategoryForm: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private postService: PostService
  ) {
    if (this.categoryService.getCategories().length === 0)
      this.categoryService.setCategories();

    this.categories = this.categoryService.getCategories();
  }

  handleDeleteClick($event: number) {
    this.categoryService.deleteCategory($event);
    this.categories = this.categoryService.getCategories();
  }

  handleDetailClick($event: number) {
    this.router.navigate(['categorylist', $event]);
  }

  ngOnInit() {
    this.pageChanged(this.currentPage);
  }

  pageChanged(page: number): void {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedData = this.categories.slice(startIndex, endIndex);
    this.currentPage = page;
    if (this.pagedData.length === 0 && this.currentPage > 1)
      this.previousPage();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged(this.currentPage);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.categories.length / this.itemsPerPage);
  }

  handleAddCategory() {
    this.addCategoryForm = !this.addCategoryForm;
  }

  handleSaveClick() {
    if (this.newCategoryName == '' || this.newCategoryDate === '')
      alert('Name or Creation Date cannot be empty.');
    else {
      this.categoryService.addCategory(
        this.newCategoryName,
        this.newCategoryDate
      );
      this.pageChanged(this.currentPage);
      this.handleCancelClick();
    }
  }

  handleCancelClick() {
    this.addCategoryForm = false;
    this.newCategoryName = '';
    this.newCategoryDate = '';
  }
}
