import { Component, inject, OnInit, signal } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';
import { ProductoService } from '../../../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../components/product-card/product-card';
import { ModalCreateProduct } from '../../components/modal-create-product/modal-create-product';

@Component({
  selector: 'app-peticiones-http-page',
  standalone: true,
  imports: [CommonModule, ProductCard, ModalCreateProduct],
  templateUrl: './peticiones-http-page.html',
})
export default class PeticionesHttpPageComponent implements OnInit {
  private readonly titleService = inject(PageHeaderService);
  private readonly productoService = inject(ProductoService);


  ngOnInit(): void {
    this.titleService.setPageInfo('Peticiones HTTP', 'Ejemplo de peticiones HTTP a un API externa con un proxy.');

  }
}
