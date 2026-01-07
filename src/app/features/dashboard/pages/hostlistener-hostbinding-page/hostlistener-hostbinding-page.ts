import { Component, inject, OnInit } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-hostlistener-hostbinding-page',
  imports: [],
  templateUrl: './hostlistener-hostbinding-page.html',
})
export default class HostlistenerHostbindingPageComponent implements OnInit {
private readonly titleService = inject(PageHeaderService);

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'HostListener y  HostBinding',
      'por rellenar'
    );
  }
}
