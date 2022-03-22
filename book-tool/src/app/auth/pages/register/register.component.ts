import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerError: boolean = false;
  emailExistsError: boolean = false;
  user: any;

  registerForm: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router:Router ) { }

  ngOnInit(): void { }

  get emailValid() {
    return this.registerForm.get('email').valid && this.registerForm.get('email').touched;
  }

  get emailNoValid() {
    return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
  }

  get passwordValid() {
    return this.registerForm.get('password').valid && this.registerForm.get('password').touched;
  }

  get passwordNoValid() {
    return this.registerForm.get('password').invalid && this.registerForm.get('password').touched;
  }

  get confPassValid() {
    const PASS1 = this.registerForm.get('password').value;
    const PASS2 = this.registerForm.get('confirmPassword').value;

    return ((PASS1 === PASS2) ? true : false) && (this.registerForm.get('confirmPassword').touched);
  }

  get confPassNoValid() {
    const PASS1 = this.registerForm.get('password').value;
    const PASS2 = this.registerForm.get('confirmPassword').value;

    return ((PASS1 === PASS2) ? false : true) && (this.registerForm.get('confirmPassword').touched);
  }

  onRegister() {
    const { email, password } = this.registerForm.value;

    if (this.registerForm.valid) {

      this._authService.register( email, password ).then( (res: any) => {

        if ( res.code === 'auth/email-already-in-use' ) {
          this.emailExistsError = true;
          return;
        } else {
          this.user = res;
          this._router.navigate(['/auth','callback', 'register']);
        }

      });
    } else {
      this.registerError = true;
    }
  }

  async onGoogleLogin(){
    this._authService.loginGoogle().then( user =>{
      this._authService.createUserRecord(user);
      this._router.navigate(['/private', 'dashboard','home-dashboard']);
    });      
  }

}
