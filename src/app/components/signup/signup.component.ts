import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;

    isEmailCorrect = true;
    isPasswordCorrect = true;
    isConfirmationCorrect = true;

    constructor(
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.router.navigate(['']).then();
        }
    }

    onSubmit(): void {
        this.isLoginFailed = false;
        this.authService.register(this.form).subscribe(
            data => {
                this.tokenStorage.saveToken(data.token);
                this.tokenStorage.saveUser(data);

                this.router.navigate(['']).then();
            },
            err => {
                if (err.status === 409) {
                    this.isLoginFailed = true;
                }
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

    onPasswordChange(password: NgModel, passwordConfirm: NgModel): void {
        if (!password.value) {
            this.disableSubmitButton();

            if (passwordConfirm.value) {
                this.isConfirmationCorrect = false;
                document.getElementById('passwordConfirm')?.classList.add('is-invalid');
                document.getElementById('passwordConfirm')?.classList.remove('is-valid');
            } else {
                document.getElementById('passwordConfirm')?.classList.remove('is-valid');
                document.getElementById('passwordConfirm')?.classList.remove('is-invalid');
            }

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

        if (password.value === passwordConfirm.value) {
            this.enableSubmitButton();
            this.isConfirmationCorrect = true;
            document.getElementById('passwordConfirm')?.classList.add('is-valid');
            document.getElementById('passwordConfirm')?.classList.remove('is-invalid');
        } else {
            this.disableSubmitButton();
            this.isConfirmationCorrect = false;
            document.getElementById('passwordConfirm')?.classList.remove('is-valid');
            document.getElementById('passwordConfirm')?.classList.add('is-invalid');
        }

        this.updateSubmitButtonStatus();
    }

    updateSubmitButtonStatus(): void {
        if (this.isPasswordCorrect && this.isEmailCorrect && this.isConfirmationCorrect
            && this.form.password && this.form.email && this.form.passwordConfirm) {
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
