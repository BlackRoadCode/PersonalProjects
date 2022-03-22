import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  emailPassError: boolean = false;
  requestsError: boolean = false;

  loginForm: FormGroup = this._formBuilder.group({
    email: [localStorage.getItem('bp_em'), [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    rememberme: [false]
  });

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void { }

  get emailValid() {
    return this.loginForm.get('email').valid && this.loginForm.get('email').touched;
  }

  get emailNoValid() {
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
  }

  get passwordValid() {
    return this.loginForm.get('password').valid && this.loginForm.get('password').touched;
  }

  get passwordNoValid() {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  async onLogin() {

    try {
      if (this.loginForm.valid) {
        const { email, password, rememberme } = this.loginForm.value;
        await this._authService.login(email, password).then( (user: any) => {

          (rememberme) ? localStorage.setItem('bp_em', email) : localStorage.removeItem('bp_em');

          if (user.emailVerified) {

            //Update emailVerification
            this._authService.createUserRecord(user);
            this._router.navigate(['/private', 'dashboard', 'home-dashboard']);
            return;
          }

          if (user.code === 'auth/wrong-password' || user.code === 'auth/user-not-found') {

            this.emailPassError = true;
            return;

          } else if (user.code === 'auth/too-many-requests') {

            this.requestsError = true;
            return;

          } else if (!user.emailVerified) {

            this._router.navigate(['/auth', 'callback', 'verification']);
            return;

          }

        });
      }
    } catch (error) {
      return error;
    }

    }

  async onGoogleLogin(){

    
      this._authService.loginGoogle().then( user =>{
        this._authService.createUserRecord(user);
        this._router.navigate(['/private', 'dashboard','home-dashboard']);
      });      
    }

  async onFacebookLogin(){
    }

  }


