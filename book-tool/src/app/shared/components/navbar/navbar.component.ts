import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css' ]
})
export class NavbarComponent implements OnInit {

  public user:User;

  constructor( 
    public translateService:TranslateService, 
    private _appComponent:AppComponent, 
    private _authService:AuthService, 
    private _router:Router
    ) { }
  
  ngOnInit(): void { 
    this._authService.user$.subscribe( user => this.user = user );
   }

  switchLang( lang:string ){
      this._appComponent.translateService.use(lang);
      localStorage.setItem('bp_lng', lang);
  }

  logout(){

    this.resetLocalStorage();

    setTimeout(() => {
      this._authService.logout();
      this._router.navigateByUrl('');
    }, 500);
  }
  
  resetLocalStorage(){
    console.log('reset local storage');
    
    localStorage.removeItem('bp_tu');
    // -----User Items
    localStorage.removeItem('bp_wi');
    localStorage.removeItem('bp_no');
    localStorage.removeItem('bp_so');
    localStorage.removeItem('bp_ta');
    localStorage.removeItem('bp_in');
    localStorage.removeItem('bp_ti');
    localStorage.removeItem('bp_ca');
  }
  

}
