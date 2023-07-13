import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    UserListComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserModule { }
