import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Task-Management-App_Frontend';
  isLogged = false;

  constructor(private router: Router, private toast: NgToastService) {}
  handleLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      this.isLogged = false;
      this.toast.error({
        detail: 'Please login to continue',
        summary: 'Error',
      });
    } else {
      this.isLogged = true;
    }
  }
}
