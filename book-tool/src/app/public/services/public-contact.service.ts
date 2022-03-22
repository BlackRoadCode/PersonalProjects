import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { PublicContact } from '../interfaces/public-contact.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicContactService {

  public publicContact: PublicContact;

  constructor( private _angularFirestore:AngularFirestore ) { }

  createContact( data:PublicContact ){
    const contactDB: AngularFirestoreDocument<PublicContact> = this._angularFirestore.collection('public-contacts').doc(data.pcid);
    return contactDB.set(data, { merge: true });
  }
}
