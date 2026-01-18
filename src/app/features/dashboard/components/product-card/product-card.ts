import { ChangeDetectionStrategy, Component, input, signal, OnInit, inject, SimpleChanges, OnChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import Producto, { ProductoService } from '../../../../core/services/products.service';
import { SafeUrlPipe } from '../../../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, SafeUrlPipe],
  templateUrl: './product-card.html',
})
export class ProductCard implements OnChanges {
  product = input.required<Producto>();
  
  private productService = inject(ProductoService);

  imageSrc = signal<string | null>('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png'); // Placeholder

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['product']) {
      this.loadImage();
    }
  }


  delete(id:string){
    this.productService.deleteProduct(Number(id))
  
  }
  private async loadImage(): Promise<void> {
    const fileId = this.product()?.imagen; 
    
    if (fileId) {
      const base64Data = await this.productService.getImageAsBase64(fileId);
      if (base64Data) {
        this.imageSrc.set(base64Data);
      } else {
        this.imageSrc.set('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png');
      }
    } else {
      console.warn('El producto no tiene un ID de imagen asociado.');
      this.imageSrc.set('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png');
    }
  }
}