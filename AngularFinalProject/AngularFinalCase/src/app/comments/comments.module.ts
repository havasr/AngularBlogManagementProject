import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentAddComponent } from './comment-add/comment-add.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';

import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


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
    AppModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class CommentsModule { }
