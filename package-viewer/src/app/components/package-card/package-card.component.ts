import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

import { Package } from '../../models/package.model';
import { CountFormatPipe } from '../../pipes/count-format.pipe';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CommonModule, CountFormatPipe],
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss'],
})
export class PackageCardComponent {
  readonly package = input.required<Package>();
  readonly isHovered = input(false);
  readonly isDependency = input(false);

  readonly scope = computed(() => {
    const id = this.package().id;
    const slashIndex = id.indexOf('/');
    const scope = slashIndex === -1 ? null : id.slice(0, slashIndex);
    console.log('scope', id, '->', scope);
    return scope;
  });

  readonly nameWithoutScope = computed(() => {
    const id = this.package().id;
    const slashIndex = id.indexOf('/');
    const name = slashIndex === -1 ? id : id.slice(slashIndex + 1);
    console.log('nameWithoutScope', id, '->', name);
    return name;
  });
}
