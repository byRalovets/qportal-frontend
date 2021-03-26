import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {FieldsComponent} from './components/fields/fields.component';
import {ResponsesComponent} from './components/responses/responses.component';
import {QuestionnaireComponent} from './components/questionnaire/questionnaire.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {ProfileInfoComponent} from './components/profile-info/profile-info.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: QuestionnaireComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'password', component: ChangePasswordComponent},
  { path: 'profile', component: ProfileInfoComponent },
  { path: 'fields', component: FieldsComponent },
  { path: 'responses', component: ResponsesComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
