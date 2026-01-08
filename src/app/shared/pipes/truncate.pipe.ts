import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 20, suffix = '…'): string {
    if (!value) return '';
    const text = value.toString();
    return text.length > limit ? text.slice(0, limit) + suffix : text;
  }
}
