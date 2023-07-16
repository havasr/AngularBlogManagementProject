import { Injectable } from '@angular/core';
import { Post } from './post';
import { defaultposts } from 'src/assets/defaultposts';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  constructor() {}
  getPosts(): Post[] {
    return this.posts;
  }

  setPosts(): void {
    this.posts = defaultposts;
  }

  deletePost(id: number): void {
    this.posts = this.posts.filter((post) => post.postId !== id);
  }

  findPostById(id: number): Post | undefined {
    return this.posts.find((post) => post.postId === Number(id));
  }

  addPost(post: Post) {
    this.posts.push(post);
  }

  updatePost(updatedPost: Post) {
    this.posts = this.posts.map((post) => {
      if (post.postId === updatedPost.postId) post = updatedPost;
      return post;
    });
  }
}
