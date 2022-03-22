import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Source } from '../interfaces/sources.interface';

@Injectable({
  providedIn: 'root'
})
export class SourcesService {

  // private itemsCollection: AngularFirestoreCollection<Source>;
  private itemsCollection: AngularFirestoreCollection<Source>;
  private item: AngularFirestoreDocument<Source>;
  public source: Source;
  sources: Observable<Source[]>;

  constructor( private _angularFirestore: AngularFirestore ) { }

  getSources( userId:string ):Observable<Source[]>{
    this.itemsCollection = this._angularFirestore.collection<Source>(`sources/${userId}/source`);
    return this.sources = this.itemsCollection.valueChanges();
  }

  createSource( data:Source, user:User ){
    const sourceDB: AngularFirestoreDocument<Source> = this._angularFirestore.collection('sources').doc(user.uid).collection('source').doc(data.sid);
    return sourceDB.set( data, { merge: true } );
  }

}
