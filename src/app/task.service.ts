import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, createTask } from './task.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private backendBaseServerUrl: string = 'https://quaint-teal-kilt.cyclic.app/api';

  constructor(private http: HttpClient) {}

  // This is the getTasks() method that will return an Observable of type Task[]. I'm removing the isSuccess property from the response object using the map() operator. from rxjs/operators.
  getTasks(): Observable<Task[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<{ tasks: Task[]; isSuccess: boolean }>(
        `${this.backendBaseServerUrl}/task`,
        { headers }
      )
      .pipe(map((response) => response.tasks));
  }

  // This is getTaskById() method that will return an Observable of type Task. This is responsible for getting a single task from the database.
  getTaskById(taskId: string): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<{ task: Task; isSuccess: boolean }>(
        `${this.backendBaseServerUrl}/task/${taskId}`,
        { headers }
      )
      .pipe(map((response) => response.task));
  }

  // This is createTask() method that will return an Observable of type Task. This is responsible for creating a new task in the database.
  createTask(newTask: createTask): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Task>(
      `${this.backendBaseServerUrl}/task`,
      newTask,
      { headers }
    );
  }

  // This is updateTask() method that will return an Observable of type Task. This is responsible for updating an existing task in the database.
  updateTask(updatedTask: Task): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Task>(
      `${this.backendBaseServerUrl}/task/${updatedTask._id}`,
      updatedTask,
      { headers }
    );
  }

  // This is deleteTask() method that will return an Observable of type Task. This is responsible for deleting an existing task in the database.
  deleteTask(taskId: string): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Task>(
      `${this.backendBaseServerUrl}/task/${taskId}`,
      { headers }
    );
  }
}
