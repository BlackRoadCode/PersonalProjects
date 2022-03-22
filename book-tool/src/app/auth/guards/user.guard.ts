import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {

  constructor( private _authService:AuthService, private _router:Router ){ }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
      return this._authService.user$.pipe(
        take(1),
        map( (user) => user && this._authService.isUser(user) ),
        tap( ( canLogin ) => {
          if( !canLogin ){
            Swal.fire({
              icon:'error',
              title:'Error de acceso',
              text:'Solo los usuarios registrados pueden entrar a este directorio'
            });
            this._authService.logout();
            this._router.navigate(['auth','login']);
          }
        } )
      );
  }
}
