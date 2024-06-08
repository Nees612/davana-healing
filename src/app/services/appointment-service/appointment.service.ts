import { Injectable } from '@angular/core';
import { Appointment } from '../../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = "http://localhost:5078/api";
  private url = this.baseUrl + '/Appointment';

  constructor(private httpClient: HttpClient) { }

  getAppointmentByCoachID(coachID: string){
    return this.httpClient.get<Appointment[]>(`${this.url}/coach-appointments/${coachID}`);
  }
}
