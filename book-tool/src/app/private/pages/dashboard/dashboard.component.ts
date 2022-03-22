import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public user:User;
  public premiumUserMessage = true;

  constructor( public _dataService:DataService , private _authService:AuthService) { }

  ngOnInit(): void { 
    this._authService.user$.subscribe( user => {
      this.user = user;

      // console.log('Esto trae userTU de mi actual usuario: ', user.userTU);

      if( user.userTU === undefined ){
        this.premiumUserMessage = true;
      } else {
        this.premiumUserMessage = false;
        localStorage.setItem('bp_tu', user.userTU);
      }

    });
  }

}