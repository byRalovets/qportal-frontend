import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    form: any = {};
    isLoggedIn = false;
    isBadCredentials = false;
    isUserNotExist = false;
    errorMessage = '';
    isEmailCorrect = true;
    isPasswordCorrect = true;

    constructor(
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.router.navigate(['']).then();
        }
    }

    onSubmit(): void {
        this.isUserNotExist = false;
        this.isBadCredentials = false;
        this.authService.login(this.form).subscribe(
            data => {
                this.tokenStorage.saveToken(data.token);
                this.tokenStorage.saveUser(data);

                this.isBadCredentials = false;
                this.isLoggedIn = true;

                this.router.navigate(['']).then();
            },
            err => {

                if (err.status === 401) {
                    this.isBadCredentials = true;
                    this.isUserNotExist = false;
                } else if (err.status === 404) {
                    this.isBadCredentials = false;
                    this.isUserNotExist = true;
                }

                this.errorMessage = err.error.message;
            }
        );
    }

    onEmailChange(email: NgModel): void {
        if (!email.value) {
            this.disableSubmitButton();
            document.getElementById('email')?.classList.remove('is-valid');
            document.getElementById('email')?.classList.remove('is-invalid');
            return;
        }

        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        this.isEmailCorrect = !!email.value.match(mailformat);
        if (this.isEmailCorrect) {
            document.getElementById('email')?.classList.add('is-valid');
            document.getElementById('email')?.classList.remove('is-invalid');
        } else {
            document.getElementById('email')?.classList.add('is-invalid');
            document.getElementById('email')?.classList.remove('is-valid');
        }
        this.updateSubmitButtonStatus();
    }

    onPasswordChange(password: NgModel): void {
        if (!password.value) {
            this.disableSubmitButton();
            document.getElementById('password')?.classList.remove('is-valid');
            document.getElementById('password')?.classList.remove('is-invalid');
            return;
        }

        this.isPasswordCorrect = password.value.length > 5;

        if (this.isPasswordCorrect) {
            document.getElementById('password')?.classList.add('is-valid');
            document.getElementById('password')?.classList.remove('is-invalid');
        } else {
            document.getElementById('password')?.classList.add('is-invalid');
            document.getElementById('password')?.classList.remove('is-valid');
        }
        this.updateSubmitButtonStatus();
    }

    updateSubmitButtonStatus(): void {
        if (this.isPasswordCorrect && this.isEmailCorrect && this.form.password && this.form.email) {
            this.enableSubmitButton();
        } else {
            this.disableSubmitButton();
        }
    }

    disableSubmitButton(): void {
        document.getElementById('submit')?.classList.add('disabled');
    }

    enableSubmitButton(): void {
        document.getElementById('submit')?.classList.remove('disabled');
    }
}
