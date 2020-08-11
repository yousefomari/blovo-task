import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  blogs: any[];
  pageNumber: number = 1;
  last: boolean = false;
  blogId: number;

  constructor(
    private BlogService: BlogService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.BlogService.list({
      page: 1,
      limit: 10,
    }).subscribe(
      (response: any[]) => {
        this.blogs = response;
      },
      (error) => {}
    );
  }

  get isLogged() {
    return this.userService.checkIsLoggedIn();
  }

  getBlogsForPage(action: string, num?: number) {
    if (action == 'decrement') {
      this.pageNumber--;
    } else if (action == 'increment') {
      this.pageNumber++;
    } else {
      this.pageNumber = num || 1;
    }
    const param = {
      page: this.pageNumber,
      limit: 10,
    };

    this.BlogService.list(param).subscribe(
      (response: any[]) => {
        if (!response.length) {
          this.last = true;
          this.pageNumber--;
          return;
        } else {
          this.last = false;
        }
        this.blogs = response;
      },
      (error) => {}
    );
  }

  likeBlog(blog){
	blog.likes++;
	 	const data = {id:blog.id, likes: blog.likes };
		this.BlogService.addLike(data).subscribe(
			(response: any[]) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			}
		);
  }

  deleteBlog(){

		this.BlogService.delete(this.blogId).subscribe(
			(response: any[]) => {
				console.log(response);
				this.getBlogsForPage('', 1);
			},
			(error) => {
				console.log(error);
			}
		);
  }

}
