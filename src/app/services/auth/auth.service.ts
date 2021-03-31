import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'https://qportal.herokuapp.com/api/auth/';
const USER_API = 'https://qportal.herokuapp.com/api/user/';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(credentials: { email: string; password: string; }): Observable<any> {
        return this.http.post(AUTH_API + 'signin', {
            email: credentials.email,
            password: credentials.password
        }, httpOptions);
    }

    register(user: { email: string; password: string; firstName: string; lastName: string; phoneNumber: string; }): Observable<any> {
        return this.http.post(AUTH_API + 'signup', {
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber
        }, httpOptions);
    }

    updatePassword(updatePasswordRequest: { oldPassword: string; newPassword: string; }): Observable<any> {
        return this.http.post(USER_API + 'update-password', JSON.stringify(updatePasswordRequest), httpOptions);
    }

    updateProfile(updateProfileRequest: {
        email: string; fisrtName: string; lastName: string;
        phoneNumber: string; password: string
    }): Observable<any> {
        return this.http.post(USER_API + 'update-profile', updateProfileRequest, httpOptions);
    }
}
