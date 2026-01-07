import { Component, inject, OnInit } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-peticiones-http-page',
  imports: [],
  templateUrl: './peticiones-http-page.html',
})
export default class PeticionesHttpPageComponent implements OnInit {
private readonly titleService = inject(PageHeaderService);

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'Peticiones HTTP',
      'Por rellenar'
    );
  }
}
