import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface ComparisonItem {
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
  leftTag?: string;
  rightTag?: string;
}

@Component({
  selector: 'app-comparison-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparison-grid.component.html',
})
export class ComparisonGridComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() items: ComparisonItem[] = [];
  @Input() gridClasses = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3';
  @Input() accentColor = 'emerald';

  get accentBadgeClass(): string {
    return this.accentColor === 'emerald'
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200'
      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200';
  }
}
