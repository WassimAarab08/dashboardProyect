import { Injectable, signal } from '@angular/core';

interface StoredData {
  usuario?: string;
  preferencia?: string;
  tema?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  private readonly storageKeys = {
    usuario: 'usuario',
    preferencia: 'preferencia',
    tema: 'tema'
  };

  data = signal<StoredData>({});

  constructor() {
    this.cargar();
  }

  guardar(usuario: string, preferencia: string, tema: string): void {
    localStorage.setItem(this.storageKeys.usuario, usuario);
    localStorage.setItem(this.storageKeys.preferencia, preferencia);
    localStorage.setItem(this.storageKeys.tema, tema);
    this.cargar();
  }

  cargar(): void {
    this.data.set({
      usuario: localStorage.getItem(this.storageKeys.usuario) || undefined,
      preferencia: localStorage.getItem(this.storageKeys.preferencia) || undefined,
      tema: localStorage.getItem(this.storageKeys.tema) || undefined
    });
  }

  limpiar(): void {
    localStorage.removeItem(this.storageKeys.usuario);
    localStorage.removeItem(this.storageKeys.preferencia);
    localStorage.removeItem(this.storageKeys.tema);
    this.cargar();
  }

  // Métodos genéricos para otros usos
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
    this.cargar();
  }
}
