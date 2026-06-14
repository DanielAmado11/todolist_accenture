import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
  IonSelect,
  IonSelectOption,
  ModalController,
} from '@ionic/angular/standalone';
import { Category } from '../../../core/models/category.model';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonButtons,
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  @Input() task?: Task;
  @Input() categories: Category[] = [];

  title = '';
  selectedCategoryId: string | null = null;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.task) {
      this.title = this.task.title;
      this.selectedCategoryId = this.task.categoryId;
    }
  }

  confirm() {
    if (!this.title.trim()) return;
    this.modalCtrl.dismiss(
      { title: this.title.trim(), categoryId: this.selectedCategoryId },
      'confirm',
    );
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
