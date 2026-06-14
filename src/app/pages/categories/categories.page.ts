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
  ModalController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, pencil } from 'ionicons/icons';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';
import { CategoryModalComponent } from 'src/app/components/modals/categories-modal/categories-modal.component';

@Component({
  selector: 'app-categories',
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
    CategoryModalComponent,
  ],
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) {
    addIcons({ add, trash, pencil });
  }

  ngOnInit() {
    this.categoryService.categories$.subscribe((cats) => {
      this.categories = cats;
    });
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      breakpoints: [0, 0.5, 0.75],
      initialBreakpoint: 0.5,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.categoryService.add(data.name, data.color);
      this.showToast('Categoría creada ✅');
    }
  }

  async openEditModal(category: Category) {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: { category },
      breakpoints: [0, 0.5, 0.75],
      initialBreakpoint: 0.5,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.categoryService.update({
        ...category,
        name: data.name,
        color: data.color,
      });
      this.showToast('Categoría actualizada ✅');
    }
  }

  async confirmDelete(category: Category) {
    this.categoryService.delete(category.id);
    this.showToast('Categoría eliminada');
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
