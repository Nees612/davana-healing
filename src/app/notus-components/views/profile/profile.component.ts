import { Component } from "@angular/core";
import { AuthNavbarComponent } from "../../components/navbars/auth-navbar/auth-navbar.component";
import { FooterComponent } from "../../components/footers/footer/footer.component";

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePipe } from '@angular/common';

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [AuthNavbarComponent,
    FooterComponent,
    MatDatepickerModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./profile.component.html",
})
export class ProfileComponent {
  selected: Date | null;

  email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = '';

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    this.selected = new Date();
  }
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

}
