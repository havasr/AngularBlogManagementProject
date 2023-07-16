import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppModule,
    RouterModule
  ]
})
export class CategoryModule { }
