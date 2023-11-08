import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { createTask } from '../task.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
})
export class TaskCreateComponent {
  task: createTask = {
    title: '',
    description: '',
    priority: 'Select Priority',
  };
  constructor(private taskService: TaskService, private router: Router) {}

  // this is the onSubmit() method that will create a new task in the database and then navigate to the task list page.
  onSubmit() {

    // this self variable is used to access the component instance inside the subscribe() method.
    const self = this;
    this.taskService.createTask(this.task).subscribe({
      next(task) {
        console.log('Task updated', task);
        self.router.navigate(['/']);
      },
      error(msg) {
        console.log('Something went wrong', msg);
      },
    });
  }
}
