import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PublicContact } from 'src/app/public/interfaces/public-contact.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { PublicContactService } from '../../services/public-contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public publicContactForm: FormGroup = this._formBuilder.group({
    publicContactName:[''],
    publicContactEmail: ['', [Validators.required, Validators.email]],
    publicContactText: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor( 
    private _angularFirestore: AngularFirestore,
    private _publicContactService: PublicContactService,
    private _formBuilder:FormBuilder,  
    private _router:Router
    ) { }

  ngOnInit(): void { }

  savePublicContact() {
    
    if ( this.publicContactForm.valid ) {

      const data: PublicContact = {
        pcid: this._angularFirestore.createId(),
        publicContactName:this.publicContactForm.get('publicContactName').value,
        publicContactEmail:this.publicContactForm.get('publicContactEmail').value,
        publicContactText:this.publicContactForm.get('publicContactText').value,
      }


      console.log( 'esto trae data: ', data );
      

      /* public service - save public contact register */
      this._publicContactService.createContact(data).then( res => {
        Swal.fire({
          icon:'success',
          title:'Mensaje enviado exitosamente',
          html:'Muchas gracias por contactarnos, muy pronto nos pondremos en contacto <strong>vía correo electrónico</strong>.'
        });

        this.publicContactForm.reset();
        this._router.navigate(['home']);

      });
    }
}

}
