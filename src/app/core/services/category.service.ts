import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor() {}
  private categories = new BehaviorSubject<Category[]>(this.loadFromStorage());
  categories$ = this.categories.asObservable();

  private loadFromStorage(): Category[] {
    const data = localStorage.getItem('categories');
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(categories: Category[]): void {
    localStorage.setItem('categories', JSON.stringify(categories));
    this.categories.next(categories);
  }

  getAll(): Category[] {
    return this.loadFromStorage();
  }

  add(name: string, color: string): void {
    const categories = this.loadFromStorage();
    categories.push({
      id: Date.now().toString(),
      name,
      color,
      createdAt: new Date(),
    });
    this.saveToStorage(categories);
  }

  update(updatedCategory: Category): void {
    const categories = this.loadFromStorage().map((c) =>
      c.id === updatedCategory.id ? updatedCategory : c,
    );
    this.saveToStorage(categories);
  }

  delete(categoryId: string): void {
    let categories = this.loadFromStorage();
    categories = categories.filter((c) => c.id !== categoryId);
    this.saveToStorage(categories);
  }
}
