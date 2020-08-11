import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
	users: any[];
	pageNumber: number = 1;
	last: boolean = false;
  constructor( private userService: UserService) { }

  ngOnInit(): void {

	this.userService.list({
		page: 1,
		limit: 10,
	  }).subscribe(
		(response: any[]) => {
			
		  this.users = response;
		  console.log(this.users);
		},
		(error) => {}
	  );
  }
  getUsersForPage(action: string, num?: number) {
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

    this.userService.list(param).subscribe(
      (response: any[]) => {
        if (!response.length) {
          this.last = true;
          this.pageNumber--;
          return;
        } else {
          this.last = false;
        }
        this.users = response;
      },
      (error) => {}
    );
  }
}
