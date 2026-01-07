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
    'Controla propiedades de HTML mediante <span class="text-sky-400 font-mono">[property]</span>. Permite enlazar atributos como src, disabled, href, etc.';
  descriptionEvent =
    'Captura eventos del usuario usando <span class="text-orange-400 font-mono">(evento)</span>. Ejecuta métodos del componente cuando el usuario interactúa.';
  descriptionTwoWay =
    'Sincroniza input y variable al instante combinando <span class="text-emerald-400 font-mono">[value]</span> y <span class="text-emerald-400 font-mono">(input)</span> para crear flujo bidireccional.';

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

// Lado TS
eventBinding = signal<number>(0);

sumar() {
  this.eventBinding.update(n => n + 1);
}`;

  codeTwoWay = `// Lado de HTML
<input 
  [value]="twoWayBinding()"
  (input)="twoWayBinding.set(texto.value)"
  #texto />

// Lado TS
twoWayBinding = signal("");`;

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
