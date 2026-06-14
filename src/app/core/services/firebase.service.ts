import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
} from 'firebase/remote-config';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private app = initializeApp(environment.firebase);
  private remoteConfig = getRemoteConfig(this.app);

  constructor() {
    // Intervalo mínimo entre fetches — en desarrollo lo ponemos bajo
    this.remoteConfig.settings.minimumFetchIntervalMillis = 10000;

    // Valores por defecto si no hay conexión
    this.remoteConfig.defaultConfig = {
      show_completed_tasks: true,
    };
  }

  async fetchConfig(): Promise<void> {
    await fetchAndActivate(this.remoteConfig);
  }

  getBoolean(key: string): boolean {
    return getValue(this.remoteConfig, key).asBoolean();
  }
}
