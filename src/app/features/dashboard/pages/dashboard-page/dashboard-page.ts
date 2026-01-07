import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../../../shared/components/side-bar.componets/sidebar.component";
import { TopBarComponets } from "../../../../shared/components/top-bar.componets/top-bar.componets";
import { PageHeaderService } from '../../services/page-header.service';


@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, SidebarComponent, TopBarComponets],
  templateUrl: './dashboard-page.html',
  styleUrl:'./dashboard-page.css'
})
export default class DashboardPage {
  private titleService = inject(PageHeaderService)

   title= this.titleService.pageTitle
   descriptiom =this.titleService.pageDescription
 }
