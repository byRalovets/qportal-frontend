import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
// @ts-ignore
import {log} from 'util';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isSignupFailed = false;
  errorMessage = '';
  isPasswordCorrect = true;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    log(this.form);
    this.authService.updateProfile(this.form).subscribe(
      data => {

          // this.tokenStorage.signOut();

        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

          this.router.navigate(['']);


          //
          // this.isSignupFailed = false;
          // this.isLoggedIn = true;
          //
          // this.router.navigate(['']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignupFailed = true;
      }
    );
  }

  onPasswordChange(password: NgModel) {

  }
}
