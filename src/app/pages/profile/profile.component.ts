import { Component, Input, OnInit } from "@angular/core";
import { AuthNavbarComponent } from "../../notus-components/components/navbars/auth-navbar/auth-navbar.component";
import { FooterComponent } from "../../notus-components/components/footers/footer/footer.component";
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
import { CoachService } from "../../services/coach-service/coach.service";
import { Appointment, Coach } from "../../types";
import { AppointmentService } from "../../services/appointment-service/appointment.service";
import { UserService } from "../../services/user-service/user.service";
import { CookieService } from 'ngx-cookie-service';
import { BookingService} from "../../services/booking-service/booking.service";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";

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
    DatePipe,
    MatButtonToggleModule,
    RouterModule],
  providers: [
    provideNativeDateAdapter(),
    CookieService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  @Input() coachID!:string;

  public selected: Date | null;
  public coach: Coach;
  public appointments: Appointment[];
  public availableDates: Date[] = new Array<Date>;
  public appointmentHoursList: Appointment[];
  public isCalendarEmpty: boolean = true;
  public userHasToken: boolean = false;
  public selectedIndex: number;
  public selectedAppointment: Appointment;
  public fromReadOnly: boolean = true;

  dateFilter: (date: Date) => boolean

  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  lastName = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  comment = new FormControl('', [Validators.maxLength(500)])

  errorMessage = '';

  constructor(
    private coachService: CoachService,
    private appointmentService: AppointmentService,     
    private cookieService: CookieService,
    private bookingService: BookingService,
    private _snackBar: MatSnackBar,
    private jwtHelper: JwtHelperService ) {
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
    
    let bearerToken = `Bearer ${this.cookieService.get("auth")}`;
    let tokenExp = null;
    try
    {
      tokenExp = this.jwtHelper.getTokenExpirationDate(bearerToken);
      if(tokenExp && tokenExp > new Date())
        {
          this.userHasToken = true;
          this.setFormUserData(bearerToken);
        }else{
          this.userHasToken = false
        }
    }
    catch(e)
    {
      this.userHasToken = false;
      return
    }
  }

  private setFormUserData(bearerToken: string){
    let decodedToken = this.jwtHelper.decodeToken(bearerToken);
    let splittedUserName: string[] = decodedToken.name.split(' ');
    this.firstName.setValue(splittedUserName[0]);     
    this.lastName.setValue(splittedUserName[1]);
    this.email.setValue(decodedToken.sub);
  }

  selectAppointment(appointment: Appointment, index:number){
    this.selectedIndex = index;
    console.log(this.selectedIndex);
    this.selectedAppointment = appointment;
    console.log(this.selectedAppointment)
  }

  startBooking(){
    let bearerToken = `Bearer ${this.cookieService.get("auth")}`;
    this.bookingService.startBooking(this.selectedAppointment.id,bearerToken).subscribe(
      { 
        next: (res) => {this._snackBar.open("Booking succesfully sent!", "Got it!", {
          horizontalPosition: "center",
          verticalPosition: "top",
        })},
        error: (err) => {this._snackBar.open("Sorry something went wrong, try again later!", "Got it!", {
          horizontalPosition: "center",
          verticalPosition: "top",
        })}
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
