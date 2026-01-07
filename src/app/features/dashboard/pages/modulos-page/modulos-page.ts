import { Component, inject, OnInit } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-modulos-page',
  imports: [],
  templateUrl: './modulos-page.html',
})
export default class ModulosPageComponent implements OnInit {
private readonly titleService = inject(PageHeaderService);

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'Modulos',
      'Por rellenar'
    );
  }
}
