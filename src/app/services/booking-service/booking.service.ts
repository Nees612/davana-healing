import { Injectable } from '@angular/core';
import { Appointment } from '../../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = "http://localhost:5078/api";
  private url = this.baseUrl + '/Booking';

  constructor(private httpClient: HttpClient) { }


  startBooking(appointmentID: number,bearerToken: string) : Observable<Appointment>{
    return this.httpClient.post<Appointment>(`${this.url}/start-booking`,appointmentID, {headers: {"Authorization": bearerToken}});
  }
}
