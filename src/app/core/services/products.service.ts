import { Injectable, signal } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';

export default interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  valoracion: number;
  oferta: boolean;
  imagen:string;
  imagen_base64?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductoService {
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
        ...prod,
        // id: prod.id,
        // nombre: prod.nombre,
        // categoria: prod.categoria,
        // precio: prod.precio,
        // stock: prod.stock,
        // valoracion: prod.valoracion,
        // oferta: Boolean(prod.oferta),
        // imagen:prod.imagen
      }));
 
    this.products_list.set(lista_temp);
    

  }


  async createProduct(nuevoProd: Producto) {

    const body = {
      action: 'create',
      payload: nuevoProd
    };

     return this.postData(body);
  }


async deleteProduct(id:number){
    const body= {
     action:'delete',
     id:id
    }

    return this.postData(body)
}

async updateProduct(prod:Producto){
    const body = {
        action:'update',
        payload:prod
    }
      return this.postData(body)
}


private async postData(body:any){


    await fetch(this.BASE_URL,{
        method:'POST',
        mode:'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(body)
    })

    await this.getData()
    return true;
}
}
