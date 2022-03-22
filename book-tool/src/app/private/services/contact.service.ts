import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Contact } from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public contact: Contact;

  constructor( private _angularFirestore:AngularFirestore ) { }

  createContact( data:Contact, user:User ){
    const contactDB: AngularFirestoreDocument<Contact> = this._angularFirestore.collection('contacts').doc(user.uid).collection('contact').doc(data.cid);
    return contactDB.set(data, { merge: true });
  }

}
