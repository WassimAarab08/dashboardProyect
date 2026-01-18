import { Injectable, signal } from '@angular/core';

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  valoracion: number;
  oferta: boolean;
}

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  BASE_URL =
    'https://script.google.com/macros/s/AKfycbxgu-I3RJOIV8bOBbG5bw_30icFMMR3HvcsNVEIdfqgPNlHKJrWatwYELHcH2YKMYTp/exec';

  products_list = signal<Producto[]>([]);

  async getData() {
    const res = await fetch(this.BASE_URL);
    const dataJson = await res.json();
    const arr = Array.isArray(dataJson) ? (dataJson as Producto[]) : [];
    const lista_temp: Producto[] = arr
      .filter((prod) => prod !== null)
      .map((prod) => ({
        id: prod.id,
        nombre: prod.nombre,
        categoria: prod.categoria,
        precio: prod.precio,
        stock: prod.stock,
        valoracion: prod.valoracion,
        oferta: Boolean(prod.oferta),
      }));
    console.table(lista_temp)
    this.products_list.set(lista_temp);
  }







}
