import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './config';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogs;

  constructor(private httpClient: HttpClient) {}

  getBlog(id: number) {
    const url = this.buildUrl(`blogs/${id}`);

    return this.httpClient.get(url);
  }

  list(data) {
    const qs = Object.keys(data)
      .map((key) => `${key}=${data[key]}`)
      .join('&');

    const url = this.buildUrl(`blogs?${qs}`);

    return this.httpClient.get(url);
  }

  create(data: any) {
    const url = this.buildUrl('blogs');

    const body = {
      name: data.name,
      userId: 1,
      blogImage: data.blogImage,
      tags: data.tags,
      description: data.description,
    };
    return this.httpClient.post(url, body);
  }
  delete(id: number) {
	const url = this.buildUrl(`blogs/${id}`);
    return this.httpClient.delete(url);
  }

  addLike(params: any) {
	const url = this.buildUrl(`blogs/${params.id}`);
	
    const data = {
	  likes: params.likes
	};
	
    return this.httpClient.put(url, data);
  }

  private buildUrl(url) {
    return config.baseURL + url;
  }
}
