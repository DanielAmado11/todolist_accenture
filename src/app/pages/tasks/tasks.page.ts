import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonBadge,
  IonCheckbox,
  IonChip,
  IonButtons,
  ModalController,
  ToastController,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, pencil } from 'ionicons/icons';
import { TaskService } from '../../core/services/task.service';
import { CategoryService } from '../../core/services/category.service';
import { Task } from '../../core/models/task.model';
import { Category } from '../../core/models/category.model';
import { TaskModalComponent } from 'src/app/components/modals/task-modal/task-modal.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonBadge,
    IonCheckbox,
    IonChip,
    IonButtons,
    TaskModalComponent,
  ],
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: Task[] = [];
  categories: Category[] = [];
  selectedCategoryId: string | null = null;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
  ) {
    addIcons({ add, trash, pencil });
  }

  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.categoryService.categories$.subscribe((cats) => {
      this.categories = cats;
    });
  }

  get filteredTasks(): Task[] {
    if (!this.selectedCategoryId) return this.tasks;
    return this.tasks.filter((t) => t.categoryId === this.selectedCategoryId);
  }

  getCategoryById(id: string | null): Category | undefined {
    return this.categories.find((c) => c.id === id);
  }

  filterByCategory(categoryId: string | null) {
    this.selectedCategoryId = categoryId;
  }

  toggleComplete(task: Task) {
    this.taskService.update({ ...task, completed: !task.completed });
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent,
      componentProps: { categories: this.categories },
      breakpoints: [0, 0.5, 0.75],
      initialBreakpoint: 0.5,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.taskService.add({
        id: new Date().getTime().toString(),
        title: data.title,
        completed: false,
        categoryId: data.categoryId,
        createdAt: new Date(),
      });
      this.showToast('Tarea creada ✅');
    }
  }

  async confirmDelete(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar tarea',
      message: `¿Eliminar "${task.title}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.taskService.delete(task.id);
            this.showToast('Tarea eliminada');
          },
        },
      ],
    });
    await alert.present();
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
