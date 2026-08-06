import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { Package } from '../models/package.model';

@Injectable({ providedIn: 'root' })
export class PackageService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/packages';
  private readonly dependencyCache = new Map<string, string[]>();

  getPackages(): Observable<Package[]> {
    return this.http
      .get<Package[]>(this.baseUrl)
      .pipe(tap((packages) => console.log('getPackages() response', packages)));
  }

  getDependencies(id: string): Observable<string[]> {
    const cached = this.dependencyCache.get(id);
    if (cached) {
      return of(cached);
    }

    return this.http
      .get<string[]>(`${this.baseUrl}/${encodeURIComponent(id)}/dependencies`)
      .pipe(
        tap((dependencies) => {
          console.log('getDependencies() response', id, dependencies);
          this.dependencyCache.set(id, dependencies);
        }),
      );
  }
}
