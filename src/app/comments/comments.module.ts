import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentAddComponent } from './comment-add/comment-add.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';



@NgModule({
  declarations: [
    CommentListComponent,
    CommentAddComponent,
    CommentDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AppModule
  ]
})
export class CommentsModule { }
