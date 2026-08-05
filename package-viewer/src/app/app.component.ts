import { Component } from '@angular/core';

import { PackageListComponent } from './components/package-list/package-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PackageListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
