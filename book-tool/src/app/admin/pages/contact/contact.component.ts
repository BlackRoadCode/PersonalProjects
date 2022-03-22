import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Contact } from 'src/app/private/interfaces/contact.interface';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  user:User;
  public contacts:Contact[] = [];

  constructor( private _authService:AuthService, private _contactService:ContactService ){ 
    this._authService.user$.subscribe( user => {
      this.user = user;

      this._contactService.getContacts().subscribe( contacts => {

        console.log(contacts);
        

        this.contacts = contacts;
      });
    });
  }

  ngOnInit(): void { }

  determineClass( priority:string ){
    switch (priority) {
      case 'LOW':
        return {'table-success': true};
      case 'MEDIUM':
        return {'table-warning': true};
      case 'HIGH':
        return {'table-danger': true};
      default:
        return {'table-danger': false};
    }
  }


}
