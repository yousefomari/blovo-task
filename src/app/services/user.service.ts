import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  id;
  name;

  constructor(private httpClient: HttpClient) {}

	list(data: any){
		const qs = Object.keys(data)
    .map(key => `${key}=${data[key]}`)
	.join('&');
	
    const url = this.buildUrl(
      `users?${qs}`
	);
	
	return this.httpClient.get(url);
	}

  checkIsLoggedIn() {
    this.id = window.localStorage.getItem('id');
    this.name = window.localStorage.getItem('name');
    return this.name && this.id;
  }

  setUserData(data) {
    window.localStorage.setItem('id', data.id);
    window.localStorage.setItem('name', data.name);
    this.id = data.id;
    this.name = data.name;
  }

  get current() {
    return this.name;
  }

  login({ username, password }) {
    const url = this.buildUrl(
      `users?username=${username}&password=${password}`
    );
    this.httpClient.get(url).subscribe(
      (response: any[]) => {
        if (response.length) {
          this.setUserData({
            id: response[0]['id'],
            name: response[0]['name'],
          });
        }
      },
      (error) => {}
    );

    return this.httpClient.get(url);
  }

  register(data) {
    const url = this.buildUrl('users');
    const body = {
      name: data.name,
      username: data.username,
      password: data.password,
    };
    return this.httpClient.post(url, body);
  }

  logout() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('id');
    // window.location.reload();
  }

  private buildUrl(url) {
    return config.baseURL + url;
  }
}
