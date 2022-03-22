import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: [
  ]
})
export class ForgotPasswordComponent implements OnInit {

  errorEmail:boolean = false;
  userEmail = new FormControl('', [ Validators.email, Validators.required ]);

  constructor( private _authService:AuthService, private _router:Router ) { }

  ngOnInit(): void { }

  get emailValid() {
    return this.userEmail.valid && this.userEmail.touched;
  }

  get emailNoValid() {
    return this.userEmail.invalid && this.userEmail.touched;
  }

  async onResetPassword(){
    
    if( this.userEmail.valid ){
      try {
        const email = this.userEmail.value;
        await this._authService.resetPassword( email );
        
        Swal.fire({
          icon: 'success',
          title: 'Correo electrónioco enviado',
          text: 'Por favor revisa tu bandeja de entrada'
        });
  
        this._router.navigate([ '/auth', 'login' ]);

      } catch (error) {
      ( error.code === 'auth/user-not-found' )? this.errorEmail = true: this.errorEmail = false;
        return;
      }
    } else { return; }

  }

}
