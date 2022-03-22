import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styles: [
  ]
})
export class CallbackComponent implements OnInit {

  origin:string = '';
  showResendVerification:boolean = true;

  // Observable para esperar a que la propiedad "user" del angularFireAuth en el service se llene cuando el usuario se registre
  public user$:Observable<any> = this._authService.angularFireAuth.user;

  constructor( private _authService:AuthService, private _activatedRoute:ActivatedRoute ) { 

    this._activatedRoute.params.subscribe( params => {
      this.origin = params['origin'];
    } );

   }

  ngOnInit(): void { }

  onResendVerificationEmail(){
    this._authService.sendVerificationEmail().then( res => {
      
      Swal.fire({
        icon: 'success',
        title: 'Correo reenviado',
        text: 'El correo de verificación se ha reenviado exitosamente, por favor revisa tu bandeja de entrada y da clic al enlace de confirmación'
      });

      this.showResendVerification = false;
    });
  }

}
