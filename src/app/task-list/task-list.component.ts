import { Component, OnInit } from '@angular/core';
import { Task } from '../task.interface';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks!: Task[];

  // there boolean properties are responsible for showing the loading spinner.
  isMarkedAsCompletedLoading: boolean = false;
  isMarkedAsUnCompletedLoading: boolean = false;
  isDeleteLoading: boolean = false;
  constructor(private taskService: TaskService, private router: Router) {}

  // This is the fetchTasks() method that will fetch all the tasks from the database.
  fetchTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  // This is the handleMarkAsCompleted() method that will mark a single task as completed.
  handleMarkAsCompleted(task: Task) {
    // checking if the task is already completed.
    if (task.status == 'completed') {
      return;
    }

    // this self variable is used to access the component instance inside the subscribe() method.
    const self = this;
    this.isMarkedAsCompletedLoading = true;
    this.taskService.updateTask({ ...task, status: 'completed' }).subscribe({
      next(updatedTask) {
        console.log('Task updated', updatedTask);
        self.fetchTasks();
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
    if (task.status == 'pending' || task.status == 'overdue') {
      return;
    }

    // this self variable is used to access the component instance inside the subscribe() method.
    const self = this;
    this.isMarkedAsUnCompletedLoading = true;
    this.taskService.updateTask({ ...task, status: 'pending' }).subscribe({
      next(updatedTask) {
        console.log('Task updated', updatedTask);
        self.fetchTasks();
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
    // this self variable is used to access the component instance inside the subscribe() method.
    const self = this;
    this.isDeleteLoading = true;
    this.taskService.deleteTask(taskId).subscribe({
      next(deletedTask) {
        console.log('Task deleted', deletedTask);
        self.fetchTasks();
        self.isDeleteLoading = false;
      },
      error(msg) {
        console.log('Something went wrong', msg);
        self.isDeleteLoading = false;
      },
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
    this.fetchTasks();
  }
}
