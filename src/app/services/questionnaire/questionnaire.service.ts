import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ResponseDTO} from '../../domain/response-dto';

const API_URL = 'https://qportal.herokuapp.com/api/questionnaire/';

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireService {

    constructor(private http: HttpClient) {
    }

    getFields(): Observable<string> {
        return this.http.get(API_URL, {responseType: 'text'});
    }

    getFieldHeaders(): Observable<string> {
        return this.http.get(API_URL + 'headers', {responseType: 'text'});
    }

    sendAnswer(responseDto: ResponseDTO): void {
        this.http.post(API_URL, responseDto, {responseType: 'text'}).subscribe(() => {
        });
    }
}
