import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';

import { Package } from '../../models/package.model';
import { PackageService } from '../../services/package.service';
import { PackageCardComponent } from '../package-card/package-card.component';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule, PackageCardComponent],
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent implements OnInit {
  private readonly packageService = inject(PackageService);

  readonly packages = signal<Package[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.loading.set(true);
    this.error.set(null);
    this.packageService.getPackages().subscribe({
      next: (packages) => {
        this.packages.set(packages);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load packages.');
        this.loading.set(false);
      },
    });
  }
}
