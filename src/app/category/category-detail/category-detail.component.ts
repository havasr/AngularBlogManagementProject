import { Component } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { PostService } from 'src/app/posts/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent {
  category: Category = {
    categoryId: 0,
    name: '',
    creationDate: '',
  };

  updatedCategory: Category = {
    categoryId: this.category.categoryId,
    name: '',
    creationDate: '',
  };

  postCount: number = 0;
  editMode: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.category = this.categoryService.getCategoryById(Number(id))!;
      if (this.postService.getPosts().length === 0) {
        this.postService.setPosts();
      }
      this.postCount = this.postService
        .getPosts()
        .filter((post) => post.categoryId === Number(id)).length;
    });
  }

  handleEditClick() {
    this.editMode = !this.editMode;
  }

  handleSaveClick() {
    this.categoryService.updatedCategory(this.updatedCategory);
    this.router.navigateByUrl('/categorylist');
  }

  handleCancelClick() {
    this.editMode = false;
    this.updatedCategory.creationDate = '';
    this.updatedCategory.name = '';
  }
}
