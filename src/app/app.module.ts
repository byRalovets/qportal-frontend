import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FieldsComponent } from './components/fields/fields.component';
import { ResponsesComponent } from './components/responses/responses.component';
import {QuestionnaireComponent} from './components/questionnaire/questionnaire.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogotypeComponent} from './components/logotype/logotype.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileInfoComponent} from './components/profile-info/profile-info.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    LogotypeComponent,
    SignupComponent,
    ChangePasswordComponent,
    ProfileInfoComponent,
    FieldsComponent,
    ResponsesComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
