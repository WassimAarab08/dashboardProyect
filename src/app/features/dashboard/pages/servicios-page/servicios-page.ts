import { Component, inject, OnInit } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-servicios-page',
  imports: [],
  templateUrl: './servicios-page.html',
})
export default class ServiciosPageComponent implements OnInit {
private readonly titleService = inject(PageHeaderService);

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'Servicios',
      'Clases tipo Singleton diseñadas para compartir lógica de negocio, datos y métodos entre distintos componentes de forma centralizada.'
    );
  }
}
