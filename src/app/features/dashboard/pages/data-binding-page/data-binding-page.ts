import { Component, inject, signal, OnInit } from '@angular/core';
import DirectiveCardComponent from '../../components/explanations-card/explanations-card.component';
import { PageHeaderService } from '../../services/page-header.service';

@Component({
  selector: 'app-data-binding',
  imports: [DirectiveCardComponent],
  templateUrl: './data-binding-page.html',
})
export default class DataBindingComponent implements OnInit {
  private readonly titleService = inject(PageHeaderService);

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'Data Binding',
      'Explicación de métodos para comunicar el código con la vista.'
    );
  }

  pos = signal({ x: 0, y: 0 });
  actualizarPosicion(event: MouseEvent) {
    this.pos.set({
      x: event.clientX,
      y: event.clientY
    });
  }

  interpolacion: string =
    'Interpolación: técnica de Angular que inserta en la plantilla el valor de una variable o expresión del componente usando {{ }}. Permite mostrar datos del TS en la vista de forma simple y reactiva.';
  propertyBinding: string = '/assets/icons/angular.svg';
  isDisabled: boolean = false;
  linkUrl: string = 'https://angular.dev';
  isActive: boolean = true;
  eventBinding = signal<number>(0);
  twoWayBinding = signal('');

  // Descripciones
  descriptionInterpolation =
    'Muestra el valor de una variable usando <span class="text-purple-400 font-mono">{{ }}</span>. La interpolación es la forma más simple de insertar datos dinámicos en la vista.';
  descriptionProperty =
    'Vincula variables del componente con propiedades del DOM mediante <span class="text-sky-400 font-mono">[property]</span>. A diferencia de la interpolación, <b>preserva el tipo de dato original</b> (booleano, número, objeto) y es más eficiente al evitar conversiones innecesarias a texto.';
  descriptionEvent =
    'Gestiona la interacción del usuario mediante <span class="text-orange-400 font-mono">(evento)</span>, permitiendo el flujo de datos desde la vista hacia la lógica. Permite capturar acciones como clics, escritura o movimiento del ratón. Ejecuta métodos o actualiza Signals, accediendo opcionalmente a los datos mediante <span class="text-orange-400 font-mono">$event</span>. Mueve el ratón sobre el área de la card para observar cómo cambian las coordenadas gracias al evento <span class="text-orange-400 font-mono">(mousemove)</span>.';
  descriptionTwoWay =
    'Sincroniza automáticamente el input y la variable en ambas direcciones. Combina <span class="text-emerald-400 font-mono">[value]</span> (Property Binding: componente → vista, flujo de datos del componente hacia la vista) y <span class="text-emerald-400 font-mono">(input)</span> (Event Binding: vista → componente, flujo de datos de la vista hacia el componente). Angular proporciona la sintaxis <span class="text-emerald-400 font-mono">[()]</span> conocida como <span class="font-semibold">"Banana-in-a-box"</span> para simplificar este patrón bidireccional.';

  // Ejemplos de código
  codeInterpolation = `// Lado de HTML
<p class="text-emerald-500">
  {{ interpolacion }}
</p>

// Lado TS
interpolacion: string = "Texto dinámico...";`;

  codeProperty = `// Lado de HTML
<img [src]="imageUrl" alt="angular logo" />

<button [disabled]="isDisabled">
  Click me
</button>

<a [href]="linkUrl"> Visit site</a>

// Lado TS
imageUrl: string = '/assets/icons/angular.svg';
isDisabled: boolean = false;
`;

  codeEvent = `// Lado de HTML
<button (click)="sumar()">Sumar</button>
<button (click)="restar()">Restar</button>
// Contendero en el que detecta el evento del raton.
 <div (mousemove)="actualizarPosicion($event)">
    //....
     </div>

// Lado TS
// Funcion que suma a la señal del contador
eventBinding = signal<number>(0);
sumar() { this.eventBinding.update(n => n + 1);}
// Funcion que procesa el evento y cambia el valor de la señal
 pos = signal({ x: 0, y: 0 });
 actualizarPosicion(event: MouseEvent) {
    this.pos.set({ x: event.clientX, y: event.clientY});
  }`;

  codeTwoWay = `// Lado de HTML
<input 
  [value]="twoWayBinding()"
  (input)="twoWayBinding.set(texto.value.value)"
  #texto />

// Con ngModel para interferir tipos y usando banana in box
  <input type="number" [(ngModel)]="puntos" />

// Lado TS

// Opción A: Para uso solo dentro de este componente
  twoWayBinding = signal(""); 

// Opción B: Si quieres que un componente PADRE pueda usar [(puntos)]
  puntos = model(0);
`;

  sumar(): void {
    this.eventBinding.update((n) => n + 1);
  }
  restar(): void {
    this.eventBinding.update((n) => n - 1);
  }
  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
}
