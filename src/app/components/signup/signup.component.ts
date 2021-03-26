import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
// @ts-ignore
import {log} from 'util';
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
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        log('signupData' + data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.router.navigate(['']);
      }, err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  isEmailCorrect: boolean = true;
  isPasswordCorrect: boolean = true;
  isConfirmationCorrect: boolean = true;

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
    this.updateSubmitButtonStatus();
  }

  onPasswordChange(password: NgModel, passwordConfirm: NgModel) {
    if (!password.value) {
      this.disableSubmitButton();

      if (passwordConfirm.value) {
        this.isConfirmationCorrect = false;
        document.getElementById('passwordConfirm')?.classList.add('is-invalid');
        document.getElementById('passwordConfirm')?.classList.remove('is-valid');
      } else {
        // this.isConfirmationCorrect = false;
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

    if (password.value == passwordConfirm.value) {
      this.enableSubmitButton()
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

  updateSubmitButtonStatus() {
    if (this.isPasswordCorrect && this.isEmailCorrect && this.isConfirmationCorrect && this.form.password && this.form.email && this.form.passwordConfirm) {
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
