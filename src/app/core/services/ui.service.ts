import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // Estado del menú móvil
  isMobileMenuOpen = signal(false);
  
  // Estado del sidebar colapsado
  isSidebarCollapsed = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  openMobileMenu() {
    this.isMobileMenuOpen.set(true);
  }

  toggleSidebar() {
    this.isSidebarCollapsed.update(val => !val);
  }
}
