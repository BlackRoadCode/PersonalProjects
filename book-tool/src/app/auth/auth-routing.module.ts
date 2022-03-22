import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';


const routes:Routes = [
  { 
    path: '', 
    children: [
      { path:'login', component:LoginComponent },
      { path:'register', component:RegisterComponent },
      { path:'callback/:origin', component:CallbackComponent },
      { path:'recovery', component:ForgotPasswordComponent },
      { path:'**', redirectTo: 'login' }
    ]
}
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
