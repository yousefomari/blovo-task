import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hasError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get data() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log('submit called', this.registerForm);
    if (this.registerForm.invalid) {
      return;
    }

    const creds = {
      name: this.data.firstname.value + ' ' + this.data.lastname.value,
      username: this.data.username.value,
      password: this.data.password.value,
    };
    this.userService.register(creds).subscribe(
      (response: any[]) => {
        this.router.navigate(['/login']);
        this._snackBar.open('Registered Successfully', 'Success', {
          duration: 2000,
        });
      },
      (error) => {
        this.hasError = true;
      }
    );
  }
}
