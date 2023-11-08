import { Component } from '@angular/core';
import { Task } from '../task.interface';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  task!: Task;

  // there boolean properties are responsible for showing the loading spinner.
  isMarkedAsCompletedLoading: boolean = false;
  isMarkedAsUnCompletedLoading: boolean = false;
  
  isDeleteLoading: boolean = false;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  // This is the handleMarkAsCompleted() method that will mark a single task as completed.
  handleMarkAsCompleted(task: Task) {
    if (task.status == 'completed') {
      return;
    }
    const self = this;
    this.isMarkedAsCompletedLoading = true;
    this.taskService.updateTask({ ...task, status: 'completed' }).subscribe({
      next(updatedTask) {
        console.log('Task updated', updatedTask);
        self.fetchTask();
        self.isMarkedAsCompletedLoading = false;
      },
      error(msg) {
        console.log('Something went wrong', msg);
        self.isMarkedAsCompletedLoading = false;
      },
    });
  }

  // this is the handleMarkAsUnCompleted() method that will mark a single task as uncompleted.
  handleMarkAsUnCompleted(task: Task) {
    if (task.status == 'pending') {
      return;
    }
    const self = this;
    this.isMarkedAsUnCompletedLoading = true;
    this.taskService.updateTask({ ...task, status: 'pending' }).subscribe({
      next(updatedTask) {
        console.log('Task updated', updatedTask);
        self.fetchTask();
        self.isMarkedAsUnCompletedLoading = false;
      },
      error(msg) {
        console.log('Something went wrong', msg);
        self.isMarkedAsUnCompletedLoading = false;
      },
    });
  }

  // This is the handleDeleteTask() method that will delete a single task from the database.
  handleDeleteTask(taskId: string) {
    const self = this;
    this.isDeleteLoading = true;
    this.taskService.deleteTask(taskId).subscribe({
      next(deletedTask) {
        console.log('Task deleted', deletedTask);
        self.fetchTask();
        self.isDeleteLoading = false;
        self.router.navigate(['/']);
      },
      error(msg) {
        console.log('Something went wrong', msg);
        self.isDeleteLoading = false;
      },
    });
  }

  // This is the fetchTask() method that will fetch a single task from the database.
  fetchTask() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.taskService.getTaskById(id).subscribe((task) => {
        this.task = task;
      });
    });
  }

  ngOnInit(): void {
    this.fetchTask();
  }
}
