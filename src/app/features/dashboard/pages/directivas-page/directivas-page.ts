import { Component, signal } from '@angular/core';
import ClientCardComponent from '../../components/client-card/client-card.component';

@Component({
  selector: 'app-directivas-page',
  imports: [ClientCardComponent],
  templateUrl: './directivas-page.html',
})
export default class DirectivasPageComponent {
  isVisibleText = signal(false);
  colorSelected: string = '';
  toggleText(): void {
    this.isVisibleText.update((v) => !v);
  }


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
