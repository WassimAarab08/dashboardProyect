import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderService } from '../../services/page-header.service';
import DirectiveCardComponent from '../../components/explanations-card/explanations-card.component';
import InputEjemplo from '../../components/input-ejemplo/input-ejemplo';
import OutputEjemplo from '../../components/output-ejemplo/output-ejemplo';
import ModelEjemplo from '../../components/model-ejemplo/model-ejemplo';
import { toSignal } from '@angular/core/rxjs-interop';

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
private readonly route = inject(ActivatedRoute);
private readonly router = inject(Router);
private readonly paramsSignal = toSignal(this.route.queryParams, { initialValue: {} });

   variableInput = signal("");
   volumenModel = signal(50);
   selectedColor = signal<ColorEnviado | null>(null);
   
   urlParams = computed(() => {
    const params = this.paramsSignal() as any;
    return {
      id: params['id'],
      nombre: params['nombre'],
      mensaje: params['mensaje']
    };
  });
   
   window = window;

   // Mantien la ruta acual y le pasa los paramentros y hace un merge si tiene mas 
  actualizarUrlParams(id?: string, nombre?: string, mensaje?: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id, nombre, mensaje },
      queryParamsHandling: 'merge'
    });
  }

  

  limpiarUrlParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }

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
  descriptionUrl =
    'Pasar datos mediante la <span class="text-cyan-400 font-mono">URL</span> es útil para mantener el estado en la barra de direcciones. Usa <span class="text-cyan-400 font-mono">ActivatedRoute</span> para leer parámetros de consulta con <span class="text-cyan-400 font-mono">queryParams</span>. Ideal para filtros, búsquedas o navegación con estado persistente que el usuario puede compartir.';

  codeUrlExample = `
// Componente - Forma moderna con signals
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({ selector: 'app-comunicacion' })
export class ComunicacionPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  // Convierte queryParams Observable a Signal
  private paramsSignal = toSignal(this.route.queryParams, { initialValue: {} });
  
  // Computed: se actualiza automáticamente cuando cambian los params
  urlParams = computed(() => {
    const params = this.paramsSignal() as any;
    return {
      id: params['id'],
      nombre: params['nombre'],
      mensaje: params['mensaje']
    };
  });
  
  // Método para actualizar la URL
  actualizarUrlParams(id: string, nombre: string, mensaje: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id, nombre, mensaje }
    });
  }
}

// HTML
<button (click)="actualizarUrlParams('123', 'Juan', 'Hola')">
  Enviar parámetros
</button>

<!-- Los datos se actualizan automáticamente -->
<p>Nombre: {{ urlParams().nombre }}</p>

// URL resultante: /comunicacion?id=123&nombre=Juan&mensaje=Hola
  `;
}
