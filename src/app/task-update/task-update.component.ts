import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css'],
})
export class TaskUpdateComponent implements OnInit {
  task!: Task;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: NgToastService
  ) {}

  // This is the onSubmit() method that will update an existing task in the database and then navigate to the task list page.
  onSubmit() {
    const self = this;
    this.taskService.updateTask(this.task).subscribe({
      next(task) {
        console.log('Task updated', task);
        self.router.navigate(['/']);
        self.toast.success({
          detail: 'Task Updated Successfully!!',
          summary: 'Task Updated Successfully!!',
          duration: 5000,
        });
      },
      error(msg) {
        console.log('Something went wrong', msg);
        self.toast.error({
          detail: 'Task Updation Failed!!',
          summary: 'Task Updation Failed!!',
        });
      },
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.taskService.getTaskById(id).subscribe((task) => {
        this.task = task;
      });
    });
  }
}
