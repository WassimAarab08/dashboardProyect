import { Component, inject, OnInit } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-comunicacion-page',
  imports: [],
  templateUrl: './comunicacion-page.html',
})
export default class ComunicacionPageComponent implements OnInit {
private readonly titleService = inject(PageHeaderService);

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'Comunicaciones',
      'Explicación de cómo se utilizan las directivas que extienden las funcionalidades del HTML.'
    );
  }
}
