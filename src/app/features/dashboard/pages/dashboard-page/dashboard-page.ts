import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../../../shared/components/side-bar.componets/sidebar.component";
import { TopBarComponets } from "../../../../shared/components/top-bar.componets/top-bar.componets";


@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, SidebarComponent, TopBarComponets],
  templateUrl: './dashboard-page.html',
})
export default class DashboardPage { }
