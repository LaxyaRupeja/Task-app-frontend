import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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
  constructor(private http: HttpClient) {}
  onSubmit(): void {
    if (!this.user.email || !this.user.password) return;
    this.http.post('https://quaint-teal-kilt.cyclic.app/api/user/login', this.user).subscribe({
      next(res: any) {
        console.log(res);
        localStorage.setItem('token', res.token);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
