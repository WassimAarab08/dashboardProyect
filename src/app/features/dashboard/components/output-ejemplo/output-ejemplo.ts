import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-output-ejemplo',
  imports: [],
  templateUrl: './output-ejemplo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OutputEjemplo { 
  // Output: emite eventos al padre
  buttonClicked = output<string>();
  
  // Signal para mostrar animación cuando se emite
  isEmitting = signal(false);
  
  onButtonClick(mensaje: string) {
    // Emitir evento
    this.buttonClicked.emit(`✓ ${mensaje}`);
    
    // Mostrar animación
    this.isEmitting.set(true);
    setTimeout(() => this.isEmitting.set(false), 600);
  }
}
