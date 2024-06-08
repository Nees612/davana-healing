import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coach, Credentials } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  private baseUrl = "http://localhost:5078/api";
  private url = this.baseUrl + '/Coach';

  constructor(private httpClient: HttpClient ) { }


  getCoaches(){
    return this.httpClient.get<Coach[]>(`${this.url}/all`)
  }

  getCoach(coachID:string){
    return this.httpClient.get<Coach>(`${this.url}/coach/${coachID}`);
  }

}
