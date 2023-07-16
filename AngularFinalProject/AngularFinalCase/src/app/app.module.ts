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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { FormatNumberPipe } from './shared/pipes/format-number.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    NavbarComponent,
    FormatNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ButtonComponent, FormatNumberPipe]
})
export class AppModule { }

