import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Contact } from 'src/app/private/interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private itemsCollection: AngularFirestoreCollection<Contact>;
  private itemsCollectionGroup: AngularFirestoreCollectionGroup<Contact>;
  private item: AngularFirestoreDocument<Contact>;
  contacts: Observable<Contact[]>;

  constructor( private _angularFirestore:AngularFirestore ) { }

  getContacts( ):Observable<Contact[]>{
    this.itemsCollectionGroup = this._angularFirestore.collectionGroup<Contact>('contact');
    return this.contacts = this.itemsCollectionGroup.valueChanges({ idField: 'priority' });
  }

  getContact(){}

  updateContact( data:Contact, user:User ){
    const contactDB: AngularFirestoreDocument<Contact> = this._angularFirestore.collection('contacts').doc(user.uid).collection('contact').doc(data.cid);
    contactDB.update(data);
  }

}
