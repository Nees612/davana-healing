import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials, User } from '../../types';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private baseUrl = "https://h01422inrl.execute-api.eu-west-1.amazonaws.com/Prod/api";
  private url = this.baseUrl + '/User';

  constructor(private httpClient: HttpClient ) { }

  register(user: User) : Observable<string> {
    return this.httpClient.post<string>(`${this.url}/create`, user);
  }

  login(creds:Credentials): Observable<string> {
    return this.httpClient.post<string>(`${this.url}/login`,creds);
  }

}

