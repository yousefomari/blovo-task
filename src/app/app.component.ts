import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-9 Blog';

  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log();
  }
  get isLogged() {
    return this.userService.checkIsLoggedIn();
  }
  logout() {
    this.userService.logout();
  }
}
