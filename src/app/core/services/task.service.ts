import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor() {}
  private tasks = new BehaviorSubject<Task[]>(this.loadFromStorage());
  tasks$ = this.tasks.asObservable();

  private loadFromStorage(): Task[] {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasks.next(tasks);
  }

  getAll(): Task[] {
    return this.loadFromStorage();
  }

  add(task: Task): void {
    const tasks = this.loadFromStorage();
    tasks.push(task);
    this.saveToStorage(tasks);
  }

  update(updatedTask: Task): void {
    const tasks = this.loadFromStorage().map((t) =>
      t.id === updatedTask.id ? updatedTask : t,
    );
    this.saveToStorage(tasks);
  }

  delete(taskId: string): void {
    let tasks = this.loadFromStorage();
    tasks = tasks.filter((t) => t.id !== taskId);
    this.saveToStorage(tasks);
  }

  getByCategory(categoryId: string): Task[] {
    const tasks = this.loadFromStorage();
    return tasks.filter((t) => t.categoryId === categoryId);
  }
}
