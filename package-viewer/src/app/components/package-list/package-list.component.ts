import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Subject, of, switchMap } from 'rxjs';

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

  //load state
  readonly packages = signal<Package[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  //hover state
  private readonly hover$ = new Subject<string | null>();
  readonly hoveredId = toSignal(this.hover$, { initialValue: null });
  readonly hoveredDependencyIds = signal<string[]>([]);

  constructor() {
    this.hover$
      .pipe(
        switchMap((id) =>
          id ? this.packageService.getDependencies(id) : of([]),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((dependencies) => this.hoveredDependencyIds.set(dependencies));
  }

  ngOnInit(): void {
    this.loadPackages();
  }

  onCardEnter(pkg: Package): void {
    this.hoveredDependencyIds.set([]);
    this.hover$.next(pkg.id);
  }

  onCardLeave(): void {
    this.hover$.next(null);
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
