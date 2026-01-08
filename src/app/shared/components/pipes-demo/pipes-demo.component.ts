import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { AddSuffixPipe } from '../../pipes/add-suffix.pipe';
import { ComparisonGridComponent, ComparisonItem } from '../comparison-grid/comparison-grid.component';
import { PrefixPipe } from '../../pipes/add-prefix.pipe';

interface ClienteLite {
  name: string;
  amount: number;
  date: Date | string | number;
  role: string;
}

interface PipePair {
  rawLabel: string;
  rawValue: string;
  pipeLabel: string;
  pipeValue: string;
}

@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [CommonModule, ComparisonGridComponent],
  providers: [UpperCasePipe, CurrencyPipe, DatePipe, TimeAgoPipe, TruncatePipe, AddSuffixPipe, PrefixPipe],
  templateUrl: 'pipes-demo.component.html',
})
export class PipesDemoComponent {
  @Input() cliente!: ClienteLite;

  constructor(
    private readonly upper: UpperCasePipe,
    private readonly currency: CurrencyPipe,
    private readonly timeAgo: TimeAgoPipe,
    private readonly truncate: TruncatePipe,
    private readonly addprefix: PrefixPipe,
  ) {}

  get pairs(): ComparisonItem[] {
    if (!this.cliente) return [];

    const rawDate = new Date(this.cliente.date);
    const rawDateText = rawDate.toLocaleString('es-ES');

    return [
      {
        leftLabel: 'Nombre (original)',
        leftValue: this.cliente.name,
        rightLabel: 'Nombre (uppercase)',
        rightValue: this.upper.transform(this.cliente.name) ?? '',
      },
      {
        leftLabel: 'Monto (original)',
        leftValue: String(this.cliente.amount),
        rightLabel: 'Monto (currency)',
        rightValue: this.currency.transform(this.cliente.amount, 'EUR', 'symbol', '1.2-2', 'es-ES') ?? '',
      },
      {
        leftLabel: 'Fecha (original)',
        leftValue: rawDateText,
        rightLabel: 'Fecha (timeAgo)',
        rightValue: this.timeAgo.transform(rawDate),
      },
      {
        leftLabel: 'Rol (original)',
        leftValue: this.cliente.role,
        rightLabel: 'Rol (truncate)',
        rightValue: this.truncate.transform(this.cliente.role, 18),
      },
      {
        leftLabel: 'Nombre (original)',
        leftValue: this.cliente.name,
        rightLabel: 'Prefijo + Nombre',
        rightValue: this.addprefix.transform(this.cliente.name, '@'),
      },
    ];
  }
}
