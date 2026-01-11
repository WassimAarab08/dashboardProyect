import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

interface ColorEnviado {
  name: string;
  hex: string;
}

@Component({
  selector: 'app-output-ejemplo',
  imports: [],
  templateUrl: './output-ejemplo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OutputEjemplo { 

  colorSelected = output<ColorEnviado>();
  

  lastEmittedColor = signal<string>('');
  
  // Colores disponibles
  colors = [
    { name: 'Rojo Pasión', hex: '#ef4444' },
    { name: 'Azul Oceánico', hex: '#3b82f6' },
    { name: 'Verde Esmeralda', hex: '#10b981' },
    { name: 'Amarillo Sol', hex: '#f59e0b' },
    { name: 'Púrpura Místico', hex: '#a855f7' },
    { name: 'Rosa Chicle', hex: '#ec4899' },
  ];
  
  onColorClick(color: ColorEnviado) {
    // Emitir evento al padre con la información del color
    this.colorSelected.emit(color);
    
    // Mostrar animación temporal
    this.lastEmittedColor.set(color.hex);
    setTimeout(() => this.lastEmittedColor.set(''), 1000);
  }
}
