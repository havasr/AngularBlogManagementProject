import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ButtonComponent } from './button/button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsModule } from './posts/posts.module';
import { CategoryModule } from './category/category.module';
import { CommentsModule } from './comments/comments.module';

@NgModule({
  declarations: [AppComponent, ButtonComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ButtonComponent],
})
export class AppModule {}
