import { Injectable } from '@angular/core';
import { Appointment } from '../../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = "https://h01422inrl.execute-api.eu-west-1.amazonaws.com/Prod/api";
  private url = this.baseUrl + '/Booking';

  constructor(private httpClient: HttpClient) { }


  startBooking(appointmentID: number,bearerToken: string) : Observable<Appointment>{
    return this.httpClient.post<Appointment>(`${this.url}/start-booking`,appointmentID, {headers: {"Authorization": bearerToken}});
  }
}
