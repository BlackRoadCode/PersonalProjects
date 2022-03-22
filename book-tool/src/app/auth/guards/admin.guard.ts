import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor( private _authService:AuthService, private _router:Router ){ }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
      return this._authService.user$.pipe(
        take(1),
        map( (user) => user && this._authService.isAdmin(user) ),
        tap( ( canAcces ) => {
          if( !canAcces ){
            Swal.fire({
              icon:'error',
              title:'Error de acceso',
              text:'Solo los administradores pueden ingresar a este módulo.'
            });
            // this._authService.logout();
            this._router.navigate(['private','dashboard', 'home-dashboard']);
          }
        } )
      );
  }
}
