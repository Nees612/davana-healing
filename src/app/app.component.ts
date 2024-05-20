import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IndexNavbarComponent } from './notus-components/components/navbars/index-navbar/index-navbar.component';
import { FooterComponent } from './notus-components/components/footers/footer/footer.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IndexNavbarComponent, FooterComponent, RouterModule, MatCardModule, MatDatepickerModule, MatBadgeModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selected: Date | null;
  title = 'davana-healing';
}
