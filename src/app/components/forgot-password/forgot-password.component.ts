import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {NgModel} from '@angular/forms';
// @ts-ignore
import {log} from 'util';
import {ForgotPasswordService} from '../../services/forgot-password/forgot-password.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    form: any = {};
    isLoggedIn = false;
    isSent: boolean = false;

    constructor(
        private forgotPasswordService: ForgotPasswordService,
        private tokenStorage: TokenStorageService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.router.navigate(['']);
            return;
        }
    }

    onSubmit(): void {
        this.isSent = true;
        this.forgotPasswordService.sendRequest(this.form).subscribe();
    }

    isEmailCorrect: boolean = true;

    onEmailChange(email: NgModel) {
        if (!email.value) {
            this.disableSubmitButton();
            document.getElementById('email')?.classList.remove('is-valid');
            document.getElementById('email')?.classList.remove('is-invalid');
            return;
        }

        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        this.isEmailCorrect = !!email.value.match(mailformat);
        log(email.value + ' ' + this.isEmailCorrect);
        if (this.isEmailCorrect) {
            document.getElementById('email')?.classList.add('is-valid');
            document.getElementById('email')?.classList.remove('is-invalid');
        } else {
            document.getElementById('email')?.classList.add('is-invalid');
            document.getElementById('email')?.classList.remove('is-valid');
        }

        if (this.isEmailCorrect && this.form.email) {
            this.enableSubmitButton();
        } else {
            this.disableSubmitButton();
        }
    }

    disableSubmitButton() {
        document.getElementById('submit')?.classList.add('disabled');
    }

    enableSubmitButton() {
        document.getElementById('submit')?.classList.remove('disabled');
    }
}
