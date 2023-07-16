import { Injectable } from '@angular/core';
import { Post } from './post';
import { defaultposts } from 'src/assets/defaultposts';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];

  constructor() { }

  // Yazıları getirmek için kullanılan fonksiyon
  getPosts(): Post[] {
    return this.posts;
  }

  // Default yazıları atamak için kullanılan fonksiyon
  setPosts(): void {
    this.posts = defaultposts;
  }

  // Bir yazıyı silmek için kullanılan fonksiyon
  deletePost(id: number): void {
    this.posts = this.posts.filter((post) => post.postId !== id);
  }

  // Bir yazıyı ID'ye göre bulmak için kullanılan fonksiyon
  findPostById(id: number): Post | undefined {
    return this.posts.find((post) => Number(post.postId) === Number(id))
  }

  // Bir yazıyı eklemek için kullanılan fonksiyon
  addPost(post: Post) {
    this.posts.push(post);
  }

  // Bir yazıyı güncellemek için kullanılan fonksiyon
  updatePost(updatedPost: Post) {
    this.posts = this.posts.map(post => {
      if (post.postId === updatedPost.postId)
        post = updatedPost;
      return post;
    });
  }
}
