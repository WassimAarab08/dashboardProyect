import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiService } from '../../../core/services/ui.service';
import MenuItem from '../../../core/interfaces/menuItems.interfaces';
import { postAppName, preAppName } from '../../../core/constants/constants-globa';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
   styles: [`
    :host { display: block; height: 100vh; }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #18181b; border-radius: 20px; }
    
    .active-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 25%;
      height: 50%;
      width: 4px;
      background: #06b6d4;
      border-radius: 0 4px 4px 0;
      box-shadow: 0 0 15px #06b6d4;
    }

    @keyframes pulse-cyan {
      0%, 100% { opacity: 0.1; }
      50% { opacity: 0.3; }
    }
  `]

})
export class SidebarComponent {

  private uiService = inject(UiService);
  
  isCollapsed = this.uiService.isSidebarCollapsed;
  isMobileOpen = this.uiService.isMobileMenuOpen;
   preAppName = preAppName;
   postAppName =postAppName;
  menuItems: MenuItem[] = [
    { 
      id: 'dashboard', 
      label: 'NÚCLEO CENTRAL', 
      icon: 'icon-dashboard',
      route: '/dashboard'
    },
    { 
      id: 'quantum', 
      label: 'RED NEURAL', 
      icon: 'icon-network',
      route: '/quantum'
    },
    { 
      id: 'cyber', 
      label: 'SEGURIDAD', 
      icon: 'icon-security',
      route: '/cyber'
    },
    { 
      id: 'neural', 
      label: 'BASE DATOS', 
      icon: 'icon-database',
      route: '/neural'
    },
  ];

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }

  toggleMobileMenu() {
    this.uiService.toggleMobileMenu();
  }

  closeMobileMenu() {
    this.uiService.closeMobileMenu();
  }
 }
