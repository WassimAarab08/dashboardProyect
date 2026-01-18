import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit, signal } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';
import { ProductoService } from '../../../../core/services/products.service';
import { ProductCard } from '../../components/product-card/product-card'; 
import { ModalCreateProduct } from '../../components/modal-create-product/modal-create-product';

@Component({
  selector: 'app-servicios-page',
  imports: [ProductCard, ModalCreateProduct],
  templateUrl: './servicios-page.html',
})
export default class ServiciosPageComponent implements OnInit {
  private readonly titleService = inject(PageHeaderService);
  readonly productsService: ProductoService = inject(ProductoService);
  isModalOpen=signal(false)
  async ngOnInit(): Promise<void> {
    this.titleService.turnOff()
    await this.productsService.getData();
    console.table(this.productsService.products_list());
  }
  
  
  openModal(){
    this.isModalOpen.update((model) => !model)
  }
}
