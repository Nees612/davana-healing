import { Component, Input, OnInit } from "@angular/core";
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
import { CoachService } from "../../../services/coach-service/coach.service";
import { Appointment, Coach } from "../../../types";
import { AppointmentService } from "../../../services/appointment-service/appointment.service";

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
export class ProfileComponent implements OnInit {
  public selected: Date | null;
  public coach: Coach;
  public appointments: Appointment[];
  public availableDates: Date[] = new Array<Date>;
  public appointmentHoursList: Appointment[];

  public isCalendarEmpty: boolean = true;


  @Input() coachID!:string;

  dateFilter: (date: Date) => boolean

  email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = '';

  constructor(private coachService: CoachService, private appointmentService: AppointmentService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    
  }

  getSelectedDateHours(){
    let selected = this.selected? new Date(this.selected) : new Date();
    this.appointmentHoursList = this.appointments.filter(a => new Date(a.date).toDateString() === selected.toDateString());
  }
  
  ngOnInit(): void {
    this.coachService.getCoach(this.coachID).subscribe(
      (res) => {this.coach = res});
    this.appointmentService.getAppointmentByCoachID(this.coachID).subscribe(
      (res) => {
        if (res.length != 0){
          this.isCalendarEmpty = false;
        }
        this.appointments = res;        
        this.appointments.forEach(
          (a) => {this.availableDates.push(a.date)});   

        this.dateFilter = (date: Date): boolean => {      
          return this.availableDates.some(
            d => new Date(d).toDateString() === new Date(date).toDateString());
        };     
        this.selected = new Date(this.availableDates[0]);
        this.getSelectedDateHours();
      });
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
