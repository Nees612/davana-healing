import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coach, Credentials } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  private baseUrl = "https://h01422inrl.execute-api.eu-west-1.amazonaws.com/Prod/api";
  private url = this.baseUrl + '/Coach';

  constructor(private httpClient: HttpClient ) { }


  getCoaches() : Observable<Coach[]> {
    return this.httpClient.get<Coach[]>(`${this.url}/all`)
  }

  getCoach(coachID:string) : Observable<Coach> {
    return this.httpClient.get<Coach>(`${this.url}/coach/${coachID}`);
  }

}
