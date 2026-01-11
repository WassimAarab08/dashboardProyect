import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'input-ejemplo',
  imports: [],
  templateUrl: './input-ejemplo.html',
})
export default class InputEjemplo {
  // Input opcional con valor por defecto
  opcionSelecionada = input('De momento el hijo no recibió nada');
  
  // Input requerido
  titulo = input.required<string>();
  
  // Computed: reacciona automáticamente a cambios en los inputs
  estadoEntrada = computed(() => {
    const valor = this.opcionSelecionada();
    return valor ? `✓ Recibido: "${valor}"` : '⚠ Esperando datos del padre...';
  });
}
