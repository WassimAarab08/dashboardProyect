import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import Producto from '../../../../core/services/products.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input<Producto>({
    id: '101',
    nombre: 'Auriculares Studio Pro',
    categoria: 'Audio',
    precio: 89.99,
    stock: 45,
    valoracion: 4.8,
    oferta: true,
    imagen:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
  });
  handleImageError(event: any) {
    event.target.src =
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1000';
  }
}
