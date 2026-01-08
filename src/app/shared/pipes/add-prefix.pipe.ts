import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addSuffix',
})
export class PrefixPipe implements PipeTransform {
  transform(value: string | number | null | undefined, suffix = ''): string {
    if (value === null || value === undefined) return '';
    return `${suffix}${value}`;
  }
}
