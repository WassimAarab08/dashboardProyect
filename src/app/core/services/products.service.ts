import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export default interface Producto {
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
  private http = inject(HttpClient);
  private readonly BASE_URL =
    'https://script.google.com/macros/s/AKfycbxgu-I3RJOIV8bOBbG5bw_30icFMMR3HvcsNVEIdfqgPNlHKJrWatwYELHcH2YKMYTp/exec';

  products_list = signal<Producto[]>([]);
  isLoading = signal<boolean>(true);

  async getData() {
    try {
      const dataJson = await lastValueFrom(this.http.get<Producto[]>(this.BASE_URL));

      const lista_temp = (dataJson || []).filter((prod) => prod !== null);

      console.table(lista_temp);
      this.products_list.set(lista_temp);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async createProduct(nuevoProd: Producto) {
    const body = { action: 'create', payload: nuevoProd };
    return this.postData(body);
  }

  async deleteProduct(id: number | string) {
    const body = { action: 'delete', id: id };
    return this.postData(body);
  }

  async updateProduct(prod: Producto) {
    const body = { action: 'update', payload: prod };
    return this.postData(body);
  }

  private async postData(body: any) {
    await fetch(this.BASE_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await this.getData();
    return true;
  }
}
