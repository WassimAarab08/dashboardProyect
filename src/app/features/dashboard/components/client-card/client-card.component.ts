import { Component, input, LOCALE_ID } from '@angular/core';
import { DatePipe, CurrencyPipe, NgClass, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

export interface Client {
  id: number;
  name: string;
  role: string;
  amount: number;
  status: string;
  date: Date;
}

@Component({
  selector: 'app-client-card',
  imports: [DatePipe, CurrencyPipe, NgClass],
  templateUrl: './client-card.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
})
export default class ClientCardComponent {
  client = input.required<Client>();
}
