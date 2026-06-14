import { Category } from './category.model';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  categoryId: string | null;
  category?: Category;
  createdAt: Date;
}