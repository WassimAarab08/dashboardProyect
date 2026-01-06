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
   postAppName = postAppName;

  menuItems: MenuItem[] = [
    { 
      id: 'data-binding', 
      label: 'DATA BINDING', 
      icon: 'icon-data-binding',
      route: '/dashboard/data-binding' 
    },
    { 
      id: 'directivas', 
      label: 'DIRECTIVAS', 
      icon: 'icon-directivas',
      route: '/dashboard/directivas' 
    },
    { 
      id: 'comunicacion', 
      label: 'COMUNICACIÓN', 
      icon: 'icon-comunicacion',
      route: '/dashboard/comunicacion' 
    },
    { 
      id: 'formularios', 
      label: 'FORMULARIOS', 
      icon: 'icon-formularios',
      route: '/dashboard/formularios' 
    },
      { 
      id: 'servicios', 
      label: 'SERVICIOS', 
      icon: 'icon-servicios',
      route: '/dashboard/servicios' 
    },
      { 
      id: 'modulos', 
      label: 'MODULOS', 
      icon: 'icon-modulos',
      route: '/dashboard/modulos' 
    },
      { 
      id: 'hostlistener-hostbinding', 
      label: 'HOSTLISTENER-HOSTBINDING', 
      icon: 'icon-hostlistener',
      route: '/dashboard/hostlistener-hostbinding' 
    },
    { 
      id: 'peticiones-HTTP', 
      label: 'PETICIONES-HTTP', 
      icon: 'icon-http',
      route: '/dashboard/peticiones-HTTP' 
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
