import { Component, inject, OnInit, signal } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';
import DirectiveCardComponent from '../../components/explanations-card/explanations-card.component';
import InputEjemplo from '../../components/input-ejemplo/input-ejemplo';
import OutputEjemplo from '../../components/output-ejemplo/output-ejemplo';

@Component({
  selector: 'app-comunicacion-page',
  imports: [DirectiveCardComponent,InputEjemplo, OutputEjemplo],
  templateUrl: './comunicacion-page.html',
})
export default class ComunicacionPageComponent implements OnInit {
private readonly titleService = inject(PageHeaderService);

   variableInput = signal("");
   contadorModel = signal(0);
   ultimoEvento = signal("");

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'Comunicaciones',
      'Explicación de cómo se usan input, output y model para comunicacion entre componentes.'
    );
  }

  handleOutputEvent(evento: string) {
    this.ultimoEvento.set(evento);
  }
  

  descriptionInput =
   'Las <span class="text-purple-400 font-mono">input()</span> son señales que permiten recibir datos desde un componente padre hacia un componente hijo de forma reactiva. A diferencia del antiguo <span class="text-purple-400 font-mono">@Input</span>, las señales ofrecen reactividad automática, tipado fuerte y mejor rendimiento. Se pueden marcar como requeridas con <span class="text-purple-400 font-mono">input.required()</span> o con valor por defecto. Para reactividad avanzada, usa <span class="text-purple-400 font-mono">computed()</span> que se actualiza automáticamente cuando cambian los inputs.';

  codeInputExample = `
// Componente Hijo
@Component({ selector: 'app-child' })
export class ChildComponent {
  // Input requerido
  titulo = input.required<string>();
  
  // Input opcional con valor por defecto
  mensaje = input('Sin mensaje');
  
  // Computed: reacciona automáticamente
  estadoFinal = computed(() => {
    return \`\${this.titulo()}: \${this.mensaje()}\`;
  });
}

// HTML padre

    <!-- Hijo: recibe datos del padre -->

      <input-ejemplo
        [opcionSelecionada]="variableInput()"
        [titulo]="'Input Ejemplo'"
      ></input-ejemplo>
  `;

  descriptionOutput = 
    'Los <span class="text-lime-400 font-mono">output()</span> permiten que un componente hijo emita eventos hacia el padre de forma reactiva. A diferencia del antiguo <span class="text-lime-400 font-mono">@Output</span>, usan señales para mejor reactividad. El padre se suscribe con la notación <span class="text-lime-400 font-mono">(evento)="handler()"</span> y el hijo dispara eventos con <span class="text-lime-400 font-mono">emit()</span>.';

  codeOutputExample = `
// Componente Hijo
@Component({ selector: 'app-child' })
export class ChildComponent {
  // Output: emite eventos al padre
  buttonClicked = output<string>();
  
  onButtonClick(value: string) {
    this.buttonClicked.emit(value);
  }
}

// Componente Padre
<app-child (buttonClicked)="handleClick($event)" />
  `;

  descriptionModel =
    'El <span class="text-purple-400 font-mono">model()</span> permite comunicación bidireccional entre padre e hijo. Combina la funcionalidad de <span class="text-purple-400 font-mono">input()</span> y <span class="text-purple-400 font-mono">output()</span> en una única señal. El padre usa <span class="text-purple-400 font-mono">[(ngModel)]="variable"</span> para sincronizar datos automáticamente en ambas direcciones.';

  codeModelExample = `
// Componente Hijo
@Component({ selector: 'app-counter' })
export class CounterComponent {
  // Model: bidireccional
  count = model.required<number>();
  
  increment() {
    this.count.set(this.count() + 1);
  }
}

// Componente Padre
<app-counter [(count)]="myCount" />
  `;

}
