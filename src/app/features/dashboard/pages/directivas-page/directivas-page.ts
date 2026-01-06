import { Component, signal, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import ClientCardComponent from '../../components/client-card/client-card.component';
import DirectiveCardComponent from '../../components/directive-card/directive-card.component';

@Component({
  selector: 'app-directivas-page',
  imports: [ClientCardComponent, DirectiveCardComponent],
  templateUrl: './directivas-page.html',
})
export default class DirectivasPageComponent {
  isVisibleText = signal(false);
  colorSelected: string = '';
  toggleText(): void {
    this.isVisibleText.update((v) => !v);
  }
  view = signal('result');
  setView(text2: string) {
    this.view.set(text2);
  }

  // Descripciones
  descriptionIf =
    'La directiva <span class="text-purple-400 font-mono">@if</span> permite el renderizado condicional de elementos. El bloque de contenido solo se añade al DOM cuando la condición evaluada es verdadera, optimizando así el rendimiento.';
  descriptionFor =
    'La directiva <span class="text-sky-400 font-mono">@for</span> permite iterar sobre colecciones y renderizar un bloque por cada elemento. En cada iteración expones la variable del elemento (y opcionalmente el índice y flags como <span class="text-sky-400 font-mono">first/last</span>), lo que facilita crear listas dinámicas.';
  descriptionSwitch =
    'La directiva <span class="text-orange-400 font-mono">@switch</span> evalúa una expresión y renderiza únicamente el bloque que coincide con uno de sus <span class="text-orange-400 font-mono">@case</span>, o el bloque <span class="text-orange-400 font-mono">@default</span> si no hay coincidencias.';

  // Ejemplos de código
  codeIfExample = `// Lado de HTML
@if (isVisibleText()) {
  <div class="active"> ... </div>
}

// Lado de TS
isVisibleText = signal(${this.isVisibleText()});

toggleText() {
  this.isVisibleText.update(v => !v);
}`;

  codeForExample = `// Lado de HTML
@for (client of clients(); track client.id) {
  <app-client-card
    [client]="client" />
}

// Lado de TS
clients = signal([
  {
      id: 1,
      name: 'Casimiro Moreda',
      role: 'Frontend Developer',
      amount: 640.8,
      status: 'Aprobado',
      date: new Date('2020-01-11'),
    },
  // ...
]);`;

  codeSwitchExample = `// Lado de HTML
@switch (colorSelected) {
  @case ('Azul') { ... }
  @case ('Rojo') { ... }
  @case ('Verde') { ... }
  @default { ... }
}

// Lado de TS
colorSelected: string = '';`;

  clients = signal([
    {
      id: 1,
      name: 'Casimiro Moreda',
      role: 'Frontend Developer',
      amount: 640.8,
      status: 'Aprobado',
      date: new Date('2020-01-11'),
    },
    {
      id: 2,
      name: 'Sofia Ramirez',
      role: 'UI Designer',
      amount: 510.3,
      status: 'Pendiente',
      date: new Date('2020-11-20'),
    },
    {
      id: 3,
      name: 'Liam Wong',
      role: 'Project Manager',
      amount: 1200.0,
      status: 'Aprobado',
      date: new Date('2020-07-15'),
    },
    {
      id: 4,
      name: 'Emma Johnson',
      role: 'Fullstack Dev',
      amount: 840.5,
      status: 'Aprobado',
      date: new Date('2021-02-12'),
    },
  ]);
}
