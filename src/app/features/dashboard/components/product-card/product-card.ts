import { ChangeDetectionStrategy, Component, input, signal, OnInit, inject, SimpleChanges, OnChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import Producto, { ProductoService } from '../../../../core/services/products.service';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Producto>();
  
  private productService = inject(ProductoService);

  imageSrc = signal<string | null>('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png'); // Placeholder




  delete(id:string){
    this.productService.deleteProduct(Number(id))
  
  }
 
}