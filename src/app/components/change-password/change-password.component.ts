import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {Router} from '@angular/router';
import {NgModel} from '@angular/forms';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';

    isOldPasswordCorrect = true;
    isNewPasswordCorrect = true;
    isConfirmationCorrect = true;

    constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
    }

    ngOnInit(): void {
        if (!this.tokenStorage.getToken()) {
            this.router.navigate(['/signin']).then();
        }
    }

    onSubmit(): void {
        this.authService.updatePassword({oldPassword: this.form.oldPassword, newPassword: this.form.newPassword}).subscribe(
            data => {
                this.tokenStorage.saveToken(data.token);
                this.tokenStorage.saveUser(data);

                this.router.navigate(['']).then();
            }, err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    onOldPasswordChange(oldPassword: NgModel): void {
        if (!oldPassword.value) {
            this.disableSubmitButton();
            document.getElementById('oldPassword')?.classList.remove('is-valid');
            document.getElementById('oldPassword')?.classList.remove('is-invalid');
            return;
        }

        this.isOldPasswordCorrect = oldPassword.value.length > 5;

        if (this.isOldPasswordCorrect) {
            document.getElementById('oldPassword')?.classList.add('is-valid');
            document.getElementById('oldPassword')?.classList.remove('is-invalid');
        } else {
            document.getElementById('oldPassword')?.classList.add('is-invalid');
            document.getElementById('oldPassword')?.classList.remove('is-valid');
        }
        this.updateSubmitButtonStatus();
    }

    onNewPasswordChange(newPassword: NgModel, confirmPassword: NgModel): void {
        if (!newPassword.value) {
            this.disableSubmitButton();

            if (confirmPassword.value) {
                this.isConfirmationCorrect = false;
                document.getElementById('confirmPassword')?.classList.add('is-invalid');
                document.getElementById('confirmPassword')?.classList.remove('is-valid');
            } else {
                document.getElementById('confirmPassword')?.classList.remove('is-valid');
                document.getElementById('confirmPassword')?.classList.remove('is-invalid');
            }

            document.getElementById('newPassword')?.classList.remove('is-valid');
            document.getElementById('newPassword')?.classList.remove('is-invalid');
            return;
        }

        this.isNewPasswordCorrect = newPassword.value.length > 5;

        if (this.isNewPasswordCorrect) {
            document.getElementById('newPassword')?.classList.add('is-valid');
            document.getElementById('newPassword')?.classList.remove('is-invalid');
        } else {
            document.getElementById('newPassword')?.classList.add('is-invalid');
            document.getElementById('newPassword')?.classList.remove('is-valid');
        }

        if (newPassword.value === confirmPassword.value) {
            this.enableSubmitButton();
            this.isConfirmationCorrect = true;
            document.getElementById('confirmPassword')?.classList.add('is-valid');
            document.getElementById('confirmPassword')?.classList.remove('is-invalid');
        } else {
            this.disableSubmitButton();
            this.isConfirmationCorrect = false;
            document.getElementById('confirmPassword')?.classList.remove('is-valid');
            document.getElementById('confirmPassword')?.classList.add('is-invalid');
        }

        this.updateSubmitButtonStatus();
    }

    updateSubmitButtonStatus(): void {
        if (this.isOldPasswordCorrect && this.isNewPasswordCorrect
            && this.isConfirmationCorrect && this.form.oldPassword
            && this.form.newPassword && this.form.confirmPassword) {
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
