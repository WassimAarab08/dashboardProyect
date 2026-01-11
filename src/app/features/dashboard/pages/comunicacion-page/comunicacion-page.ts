import { Component, inject, OnInit, signal } from '@angular/core';
import { PageHeaderService } from '../../services/page-header.service';
import DirectiveCardComponent from '../../components/explanations-card/explanations-card.component';
import InputEjemplo from '../../components/input-ejemplo/input-ejemplo';
import OutputEjemplo from '../../components/output-ejemplo/output-ejemplo';
import ModelEjemplo from '../../components/model-ejemplo/model-ejemplo';

interface ColorEnviado {
  name: string;
  hex: string;
}

@Component({
  selector: 'app-comunicacion-page',
  imports: [DirectiveCardComponent, InputEjemplo, OutputEjemplo, ModelEjemplo],
  templateUrl: './comunicacion-page.html',
})
export default class ComunicacionPageComponent implements OnInit {
private readonly titleService = inject(PageHeaderService);

   variableInput = signal("");
   volumenModel = signal(50);
   selectedColor = signal<ColorEnviado | null>(null);

  ngOnInit(): void {
    this.titleService.setPageInfo(
      'Comunicaciones',
      'Explicación de cómo se usan input, output y model para comunicacion entre componentes.'
    );
  }

  cambiarColorSelecionado(ColorEnviado: ColorEnviado) {
    this.selectedColor.set(ColorEnviado);
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
    'Los <span class="text-lime-400 font-mono">output()</span> permiten que un componente hijo emita eventos hacia el padre de forma reactiva. A diferencia del antiguo <span class="text-lime-400 font-mono">@Output</span>, usan señales para mejor reactividad. El padre se suscribe con la notación <span class="text-lime-400 font-mono">(evento)="handler()"</span> y el hijo dispara eventos con <span class="text-lime-400 font-mono">emit()</span>. Ideal para notificar acciones del usuario o cambios de estado.';

  codeOutputExample = `
// Componente Hijo - Selector de Color
@Component({ selector: 'app-output-ejemplo' })
export class OutputEjemplo {
  // Output: emite eventos con datos del color
  colorSelected = output<ColorEnviado>();
  
  onColorClick(color: ColorEnviado) {
    // Emite evento al padre con info completa
    this.colorSelected.emit(color);
  }
}

// Componente Padre - Recibe y muestra el color
<app-output-ejemplo 
  (colorSelected)="cambiarColorSelecionado($event)"></app-output-ejemplo>

<!-- Muestra el color seleccionado -->
<div [style.background-color]="selectedColor()?.hex">
  {{ selectedColor()?.name }}
</div>
  `;

  descriptionModel =
    'El <span class="text-orange-400 font-mono">model()</span> permite comunicación bidireccional entre padre e hijo. Combina <span class="text-orange-400 font-mono">input()</span> y <span class="text-orange-400 font-mono">output()</span> en una única señal. Tanto el padre como el hijo pueden modificar el valor y los cambios se sincronizan automáticamente. Usa la sintaxis <span class="text-orange-400 font-mono">[(propiedad)]</span> para binding bidireccional.';

  codeModelExample = `
// Componente Hijo - Control de Volumen
@Component({ selector: 'app-model-ejemplo' })
export class ModelEjemplo {
  // Model: sincronización bidireccional
  volumen = model.required<number>();
  
  aumentar() {
    // El hijo modifica el valor
    this.volumen.set(this.volumen() + 10);
    //  El padre recibe el cambio automáticamente
  }
}

// Componente Padre
<app-model-ejemplo [(volumen)]="volumenModel"></app-model-ejemplo>

<!-- El padre también puede modificarlo -->
<button (click)="volumenModel.set(100)">Max</button>
<!--  El hijo recibe el cambio automáticamente -->
  `;

}
