import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  imports: [],
  templateUrl: './data-binding-page.html',
})
export default class DataBindingComponent {
interpolacion :string= "Interpolación: técnica de Angular que inserta en la plantilla el valor de una variable o expresión del componente usando {{ }}. Permite mostrar datos del TS en la vista de forma simple y reactiva."
  propertyBinding: string = '/assets/icons/angular.svg';
  eventBinding = signal<number>(0);
  twoWayBinding = signal("")
  sumar(): void {
    this.eventBinding.update((n) => n + 1);
  }
   restar(): void {
    this.eventBinding.update((n) => n - 1);
  }
}
