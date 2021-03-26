import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'https://qportal.herokuapp.com/api/reset-password/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) {
  }

  sendRequest(credentials: { email: string; }): Observable<any> {
    return this.http.post(AUTH_API, credentials.email, httpOptions);
  }

  resetPassword(credentials: { password: string }, token: string): Observable<any> {
    return this.http.put(AUTH_API, { password: credentials.password, token: token }, httpOptions);
  }
}
