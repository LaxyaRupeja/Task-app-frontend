import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { createTask } from '../task.interface';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
})
export class TaskCreateComponent implements OnInit {
  task: createTask = {
    title: '',
    description: '',
    priority: 'Select Priority',
  };
  constructor(
    private taskService: TaskService,
    private router: Router,
    private toast: NgToastService
  ) {}

  // this is the onSubmit() method that will create a new task in the database and then navigate to the task list page.
  onSubmit() {
    // this self variable is used to access the component instance inside the subscribe() method.
    const self = this;
    this.taskService.createTask(this.task).subscribe({
      next(task) {
        console.log('Task updated', task);
        self.router.navigate(['/']);
        self.toast.success({
          detail: 'Task Created Successfully!!',
          summary: 'Task Created Successfully!!',
          duration: 5000,
        });
      },
      error(msg) {
        console.log('Something went wrong', msg);
        self.toast.error({
          detail: 'Task Creation Failed!!',
          summary: 'Task Creation Failed!!',
        });
      },
    });
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      this.toast.error({
        summary: 'Please login to continue',
        detail: 'Error',
      });
    }
  }
}
