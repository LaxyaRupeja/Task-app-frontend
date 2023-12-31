import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

export interface User {
  _id?: string;
  name?: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = {
    email: '',
    password: '',
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}
  onSubmit(): void {
    if (!this.user.email || !this.user.password) {
      this.toast.error({
        detail: 'Login Failed!!',
        summary: 'Please enter email and password!!',
      });
      return;
    }
    const self = this;
    this.http
      .post('https://quaint-teal-kilt.cyclic.app/api/user/login', this.user)
      .subscribe({
        next(res: any) {
          console.log(res);
          localStorage.setItem('token', res.token);
          self.toast.success({
            detail: 'Login Successful!!',
            summary: 'Logged In Successfully!!',
            duration: 5000,
          });
          self.router.navigate(['/']);
        },
        error(err) {
          console.log(err);
          self.toast.error({
            detail: 'Login Failed!!',
            summary: 'Login Failed!!',
          });
        },
      });
  }
}
