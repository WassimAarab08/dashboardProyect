import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resource } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  valoracion: number;
  oferta: boolean;
  imagen?: string;
  imagen_base64?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = 'https://gas-cors-proxy.rickymortyknowing.workers.dev/';

  productsResource = resource({
    loader: () => {
      return firstValueFrom(
        this.http.get<Producto[]>(this.BASE_URL),
        // .pipe(map((data) => (data || []).filter((p) => p !== null))),
      );
    },
  });

  async createProduct(nuevoProd: Producto) {
    const previousData = this.productsResource.value();
    this.productsResource.value.set([...(previousData || []), nuevoProd]);

    try {
      console.error('api create');
      await firstValueFrom(this.http.post(this.BASE_URL, { action: 'create', payload: nuevoProd }));
    } catch (error) {
      this.productsResource.value.set(previousData);
    } finally {
      this.productsResource.reload();
    }
  }

  async deleteProduct(id: string | number) {
    const previousData = this.productsResource.value();
    const newData = previousData?.filter((p) => p.id !== id) || [];
    this.productsResource.value.set(newData);

    try {
      await firstValueFrom(this.http.post(this.BASE_URL, { action: 'delete', id }));
    } catch (error) {
      this.productsResource.value.set(previousData);
    }
  }

  async updateProduct(prodActualizado: Producto) {
    const previousData = this.productsResource.value();

    const newData =
      previousData?.map((p) => (p.id === prodActualizado.id ? prodActualizado : p)) || [];
    this.productsResource.value.set(newData);

    try {
      await firstValueFrom(
        this.http.post(this.BASE_URL, { action: 'update', payload: prodActualizado }),
      );
    } catch (error) {
      console.error('Error al actualizar, revirtiend...', error);
      this.productsResource.value.set(previousData);
    }
  }
}
