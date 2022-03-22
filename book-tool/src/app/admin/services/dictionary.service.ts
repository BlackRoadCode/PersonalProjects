import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LastName, Name } from 'src/app/private/interfaces/generated-name.interface';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private itemsCollection: AngularFirestoreCollection<Name>;
  private itemsCollectionDCA: DocumentChangeAction<Name>;
  private itemsLength = 0;
  maleNames: Observable<Name[]>;
  femaleNames: Observable<Name[]>;
  lastNames: Observable<LastName[]>;

  constructor( private _angularFirestore:AngularFirestore ) { }

  createMName(data:Name){
    const noteDB: AngularFirestoreDocument<Name> = this._angularFirestore.collection('bpdata').doc('name_generator').collection('es_m_names').doc(this._angularFirestore.createId());
    return noteDB.set(data, { merge: true });
  }
  
  createFName(data:Name){
    const noteDB: AngularFirestoreDocument<Name> = this._angularFirestore.collection('bpdata').doc('name_generator').collection('es_f_names').doc(this._angularFirestore.createId());
    return noteDB.set(data, { merge: true });
  }

  createLastName(data:LastName){
    const noteDB: AngularFirestoreDocument<LastName> = this._angularFirestore.collection('bpdata').doc('name_generator').collection('es_last_names').doc(this._angularFirestore.createId());
    return noteDB.set(data, { merge: true });
  }

  getMaleNames():Observable<Name[]>{
    this.itemsCollection = this._angularFirestore.collection<Name>('bpdata/name_generator/es_m_names', ref => ref.orderBy('id', 'desc').limit(1));
    return this.maleNames = this.itemsCollection.valueChanges();
  }

  getFemaleNames():Observable<Name[]>{
    this.itemsCollection = this._angularFirestore.collection<Name>('bpdata/name_generator/es_f_names', ref => ref.orderBy('id', 'desc').limit(1));
    return this.femaleNames = this.itemsCollection.valueChanges();
  }
  
  getLastNames():Observable<LastName[]>{
    this.itemsCollection = this._angularFirestore.collection<LastName>('bpdata/name_generator/es_last_names', ref => ref.orderBy('id', 'desc').limit(1));
    return this.lastNames = this.itemsCollection.valueChanges();
  }

}
