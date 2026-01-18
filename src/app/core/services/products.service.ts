import { Injectable, signal } from '@angular/core';

export default interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  valoracion: number;
  oferta: boolean;
  imagen?: string; // <-- AHORA ESTA PROPIEDAD DEBE CONTENER EL ID DEL ARCHIVO DE GOOGLE DRIVE
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
      }));

    this.products_list.set(lista_temp);
  }

  // --- NUEVO MÉTODO PARA OBTENER LA IMAGEN COMO BASE64 ---
  async getImageAsBase64(fileId: string): Promise<string | null> {
    if (!fileId) {
      console.warn('No se proporcionó fileId para la imagen.');
      return null;
    }
    
    const imageUrl = `${this.BASE_URL}?action=getImage&id=${fileId}`;
    
    try {
      const res = await fetch(imageUrl);
      const data = await res.json();

      if (data.success) {
        return data.base64Data;
      }
      
      console.error('Error al obtener la imagen desde Apps Script:', data.error);
      return null;
    } catch (error) {
      console.error('Error de red al obtener la imagen:', error);
      return null;
    }
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