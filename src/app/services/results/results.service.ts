import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const API_URL = 'https://qportal.herokuapp.com/websocket-token/';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) { }
}
