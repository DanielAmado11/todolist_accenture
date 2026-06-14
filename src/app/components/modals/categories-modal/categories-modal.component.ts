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
  ModalController,
} from '@ionic/angular/standalone';
import { Category } from '../../../core/models/category.model';

const COLORS = [
  { label: 'Azul', value: '#3880ff' },
  { label: 'Rojo', value: '#eb445a' },
  { label: 'Verde', value: '#2dd36f' },
  { label: 'Amarillo', value: '#ffc409' },
  { label: 'Morado', value: '#9b59b6' },
  { label: 'Naranja', value: '#ff6b35' },
];

@Component({
  selector: 'app-categories-modal',
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
  ],
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {
  @Input() category?: Category; // Si viene = editar, si no = crear

  name = '';
  selectedColor = '#3880ff';
  colors = COLORS;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.category) {
      this.name = this.category.name;
      this.selectedColor = this.category.color;
    }
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  confirm() {
    if (!this.name.trim()) return;
    this.modalCtrl.dismiss(
      { name: this.name.trim(), color: this.selectedColor },
      'confirm',
    );
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
