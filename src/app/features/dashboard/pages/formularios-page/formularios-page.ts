import { Component, inject, OnInit } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-formularios-page',
  imports: [],
  templateUrl: './formularios-page.html',
})
export default class FormulariosPageComponent implements OnInit {
  private readonly titleService = inject(PageHeaderService);

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'Formularios en Angular',
      'Explicación de cómo funciona la validación de formularios en Angular.'
    );
  }

}
