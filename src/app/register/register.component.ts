import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../login/login.component';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient, private router: Router) {}
  onSubmit(): void {
    const self = this;
    if (!this.user.email || !this.user.password || !this.user.name) return;
    this.http
      .post('https://quaint-teal-kilt.cyclic.app/api/user/register', this.user)
      .subscribe({
        next(res: any) {
          console.log(res);
          localStorage.setItem('token', res.token);
          self.router.navigate(['/']);
        },
        error(err) {
          console.log(err);
        },
      });
  }
}
