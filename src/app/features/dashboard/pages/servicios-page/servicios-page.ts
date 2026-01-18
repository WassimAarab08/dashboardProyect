import { Component, inject, OnInit, signal } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';
import { ProductoService } from '../../../../core/services/products.service';
import { ProductCard } from '../../components/product-card/product-card'; 

@Component({
  selector: 'app-servicios-page',
  imports: [ProductCard],
  templateUrl: './servicios-page.html',
})
export default class ServiciosPageComponent implements OnInit {
  private readonly titleService = inject(PageHeaderService);
  private readonly productsService: ProductoService = inject(ProductoService);
  
  lista_productos=signal(this.productsService.products_list())

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'Servicios',
      'Clases tipo Singleton diseñadas para compartir lógica de negocio, datos y métodos entre distintos componentes de forma centralizada.'
    );
    this.productsService.getData()
  }
}
