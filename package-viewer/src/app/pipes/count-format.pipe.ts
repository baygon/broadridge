import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countFormat',
  standalone: true,
})
export class CountFormatPipe implements PipeTransform {
  transform(value: number): string {
    return value > 1000 ? `${Math.floor(value / 1000)}K` : `${value}`;
  }
}
