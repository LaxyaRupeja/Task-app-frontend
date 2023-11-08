import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../login/login.component';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = {
    email: '',
    password: '',
    name: '',
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}
  onSubmit(): void {
    const self = this;
    if (!this.user.email || !this.user.password || !this.user.name) {
      this.toast.error({
        detail: 'Registration Failed!!',
        summary: 'Please enter email, password and name!!',
      });
      return;
    }
    this.http
      .post('https://quaint-teal-kilt.cyclic.app/api/user/register', this.user)
      .subscribe({
        next(res: any) {
          console.log(res);
          localStorage.setItem('token', res.token);
          self.router.navigate(['/']);
          self.toast.success({
            detail: 'Registration Successful!!',
            summary: 'Registered Successfully!!',
            duration: 5000,
          });
        },
        error(err) {
          console.log(err);
          self.toast.error({
            detail: 'Registration Failed!!',
            summary: 'Registration Failed!!',
          });
        },
      });
  }
}
