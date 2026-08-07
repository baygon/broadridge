import { Component, computed, input } from '@angular/core';

import { Package } from '../../models/package.model';
import { CountFormatPipe } from '../../pipes/count-format.pipe';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CountFormatPipe],
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
    return slashIndex === -1 ? null : id.slice(0, slashIndex);
  });

  readonly nameWithoutScope = computed(() => {
    const id = this.package().id;
    const slashIndex = id.indexOf('/');
    return slashIndex === -1 ? id : id.slice(slashIndex + 1);
  });
}
