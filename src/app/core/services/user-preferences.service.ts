import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

 private readonly STORAGE_KEY = 'theme';
  
  // Signal para el tema
  isDarkMode = signal<boolean>(true);

  constructor() {
    this.loadTheme();
    this.setupAutoSave();
  }

  /**
   * Carga el tema desde localStorage
   */
  private loadTheme(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const isDark = stored === 'dark';
      this.isDarkMode.set(isDark);
      this.applyTheme(isDark);
    }
  }

  /**
   * Guarda automáticamente cuando cambia el tema
   */
  private setupAutoSave(): void {
    effect(() => {
      const theme = this.isDarkMode() ? 'dark' : 'light';
      localStorage.setItem(this.STORAGE_KEY, theme);
      this.applyTheme(this.isDarkMode());
    });
  }

  /**
   * Cambia entre dark y light
   */
  toggleTheme(): void {
    this.isDarkMode.update(val => !val);
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

}
