import { Component, inject } from '@angular/core';
import { UserPreferencesService } from '../../../core/services/user-preferences.service';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.componets.html',
})
export class TopBarComponets {
  private preferencesService = inject(UserPreferencesService);
  private uiService = inject(UiService);
  
  isDarkMode = this.preferencesService.isDarkMode;
  
  toggleTheme() {
    this.preferencesService.toggleTheme();
  }

  toggleMobileMenu() {
    this.uiService.toggleMobileMenu();
  }
}
