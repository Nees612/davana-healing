import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:5078/api";
  private url = this.baseUrl + '/User';

  constructor(private httpClient: HttpClient ) { }

  login(creds:Credentials): Observable<string> {
    return this.httpClient.post<string>(`${this.url}/login`,creds);
  }

  // isUserLoggedIn(){
  //   let Bearer = 
  // }

}
