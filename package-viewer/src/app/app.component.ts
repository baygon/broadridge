import { Component, inject } from '@angular/core';

import { PackageService } from './services/package.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'package-viewer';

  private readonly packageService = inject(PackageService);

  constructor() {
    this.packageService.getPackages().subscribe((packages) => {
      for (const pkg of packages) {
        this.packageService.getDependencies(pkg.id).subscribe();
      }
    });
  }
}
