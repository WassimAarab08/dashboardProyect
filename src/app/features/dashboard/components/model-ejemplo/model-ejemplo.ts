import { ChangeDetectionStrategy, Component, computed, model } from '@angular/core';

@Component({
  selector: 'app-model-ejemplo',
  imports: [],
  templateUrl: './model-ejemplo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ModelEjemplo {
  // Model: sincronización bidireccional con el padre
  volumen = model.required<number>();
  
  // Computed: calculamos el nivel visual
  nivelVolumen = computed(() => {
    const vol = this.volumen();
    if (vol === 0) return { texto: 'Silencio', icon: '🔇', color: '#64748b' };
    if (vol <= 30) return { texto: 'Bajo', icon: '🔈', color: '#3b82f6' };
    if (vol <= 70) return { texto: 'Medio', icon: '🔉', color: '#f59e0b' };
    return { texto: 'Alto', icon: '🔊', color: '#ef4444' };
  });
  
  // Métodos del hijo para modificar el valor
  aumentar() {
    const nuevoValor = Math.min(100, this.volumen() + 10);
    this.volumen.set(nuevoValor);
  }
  
  disminuir() {
    const nuevoValor = Math.max(0, this.volumen() - 10);
    this.volumen.set(nuevoValor);
  }
  
  silenciar() {
    this.volumen.set(0);
  }
  
  maximizar() {
    this.volumen.set(100);
  }
}
