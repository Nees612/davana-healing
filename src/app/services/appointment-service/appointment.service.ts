import { Injectable } from '@angular/core';
import { Appointment } from '../../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = "https://h01422inrl.execute-api.eu-west-1.amazonaws.com/Prod/api";
  private url = this.baseUrl + '/Appointment';

  constructor(private httpClient: HttpClient) { }

  getAppointmentByCoachID(coachID: string) : Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.url}/coach-appointments/${coachID}`);
  }

}
