import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Contact } from '../../interfaces/contact.interface';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: [
  ]
})
export class ContactComponent implements OnInit {

  public user: User;
  public contacts: Contact[];
  public contact: Contact;

  public contactForm: FormGroup = this._formBuilder.group({
    contactMotive: [''],
    contactDescription: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor( 
    private _authService:AuthService, 
    private _formBuilder:FormBuilder, 
    private _contactService:ContactService, 
    private _angularFirestore: AngularFirestore,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe(user => {
      this.user = user;
      // this.getContacts(this.user.uid);
    });
  }

  saveContact() {
    
    if ( this.contactForm.valid ) {

      const data: Contact = {
        cid: this._angularFirestore.createId(),
        motive: this.contactForm.get('contactMotive').value,
        text: this.contactForm.get('contactDescription').value,
        priority: this.setPriority(this.contactForm.get('contactMotive').value),
        creationDate: new Date().toDateString(),
        userEmail: this.user.email,
        status:'OPEN'
      }

      this._contactService.createContact(data, this.user).then(res => {
        Swal.fire({
          icon:'success',
          title:'Mensaje enviado exitosamente',
          html:'Muchas gracias por contactarnos, muy pronto nos pondremos en contacto <strong>vía correo electrónico</strong>.'
        });

        this.contactForm.reset();
        this._router.navigate(['private','dashboard','home-dashboard']);

      });
    }
}

setPriority(field:string){

  switch (field) {
    case '1':
      return 'HIGH';
    case '2':
      return 'LOW';
    case '3':
      return 'LOW';
    case '4':
      return 'HIGH';
    case '5':
      return 'MEDIUM';
    default:
      return 'MEDIUM';
  }
}

}
