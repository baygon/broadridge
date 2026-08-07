import { Pipe, PipeTransform } from '@angular/core';

const UNITS = [
  { threshold: 1_000_000_000, suffix: 'B' },
  { threshold: 1_000_000, suffix: 'M' },
  { threshold: 1_000, suffix: 'K' },
];

@Pipe({
  name: 'countFormat',
  standalone: true,
})
export class CountFormatPipe implements PipeTransform {
  transform(value: number): string {
    const unit = UNITS.find(({ threshold }) => value > threshold);
    return unit
      ? `${Math.floor(value / unit.threshold)}${unit.suffix}`
      : `${value}`;
  }
}
