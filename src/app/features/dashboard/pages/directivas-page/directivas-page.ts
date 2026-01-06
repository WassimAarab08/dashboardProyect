import { Component, signal, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import ClientCardComponent from '../../components/client-card/client-card.component';

@Component({
  selector: 'app-directivas-page',
  imports: [ClientCardComponent],
  templateUrl: './directivas-page.html',
})
export default class DirectivasPageComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  isVisibleText = signal(false);
  colorSelected: string = '';
  toggleText(): void {
    this.isVisibleText.update((v) => !v);
  }
  view = signal('result');
  setView(text2: string) {
    this.view.set(text2);
  }

  // Ejemplos de código
  codeIfExample = `// Template structure
@if (isVisibleText()) {
  <div class="active"> ... </div>
}

// Logic layer
isVisibleText = signal(${this.isVisibleText()});

toggleText() {
  this.isVisibleText.update(v => !v);
}`;


  codeForExample = `// Template structure
@for (client of clients(); track client.id) {
  <app-client-card
    [client]="client" />
}

// Data layer
clients = signal([
  { id: 1, name: '...' },
  // ...
]);`;



  codeSwitchExample = `// Template structure
@switch (colorSelected) {
  @case ('Azul') { ... }
  @case ('Rojo') { ... }
  @case ('Verde') { ... }
  @default { ... }
}

// State
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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('highlight.js').then((hljs) => {
        // Aplicar highlight a todos los bloques de código
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.default.highlightElement(block as HTMLElement);
        });
      });
    }
  }
}
