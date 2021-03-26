import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// @ts-ignore
import {log} from 'util';
import {FieldDto} from '../../domain/field/field-dto';

const Q_API_URL = 'https://qportal.herokuapp.com//api/questionnaire/';
const F_API_URL = 'https://qportal.herokuapp.com//api/fields/';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private http: HttpClient) { }

  getQuestionnaire(): Observable<any> {
    return this.http.get(Q_API_URL, { responseType: 'text' });
  }

  getFields(page: number, count: number): Observable<string> {
    return this.http.get(F_API_URL + '?page=' + page + '&count=' + count, {responseType: 'text'});
  }

  addField(field: string): Observable<any> {
    return this.http.post(F_API_URL, JSON.parse(field), { responseType: 'text'});
  }

  updateField(field: FieldDto): Observable<any> {
    return this.http.put(F_API_URL + field.id, field, { responseType: 'text'});
  }

  deleteField(field: FieldDto): Observable<any> {
    return this.http.delete(F_API_URL + field.id, { responseType: 'text'});
  }
}
