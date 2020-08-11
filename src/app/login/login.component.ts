import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hasError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get data() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.hasError = false;

    const creds = {
      username: this.data.username.value,
      password: this.data.password.value,
    };
    this.userService.login(creds).subscribe(
      (response: any[]) => {
        if (response.length) {
          this.router.navigate(['/home']);
          this._snackBar.open('Logged In Successfully', 'Success', {
            duration: 2000,
          });
        } else {
          this.hasError = true;
        }
      },
      (error) => {
        this.hasError = true;
      }
    );
  }
}
