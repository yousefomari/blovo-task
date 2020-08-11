import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './config';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  blogs;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  get(blogId: number) {
    const url = this.buildUrl(`comments?blogId=${blogId}`);
    return this.httpClient.get(url);
  }

  create({ blogId, comment }) {
    const url = this.buildUrl('comments');

    const body = {
      userName: this.userService.current,
      blogId,
      comment,
    };

    return this.httpClient.post(url, body);
  }

  delete(commentId: number) {
    const url = this.buildUrl(`comments/${commentId}`);
    return this.httpClient.delete(url);
  }

  private buildUrl(url) {
    return config.baseURL + url;
  }
}
