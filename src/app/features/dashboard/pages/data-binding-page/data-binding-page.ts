import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  imports: [],
  templateUrl: './data-binding-page.html',
})
export default class DataBindingComponent {
  propertyBinding: string = '/assets/icons/angular.svg';
  eventBinding = signal<number>(0);

  sumar(): void {
    this.eventBinding.update((n) => n + 1);
  }
}
