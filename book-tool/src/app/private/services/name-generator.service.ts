import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { GeneratedName, LastName, Name } from '../interfaces/generated-name.interface';

@Injectable({
  providedIn: 'root'
})
export class NameGeneratorService {

  // private itemsCollection: AngularFirestoreCollection<GeneratedName>;
  private itemName: AngularFirestoreCollection<Name>;
  private itemLastName: AngularFirestoreCollection<LastName>;

  public name:Observable<Name[]>;
  public lastName:Observable<LastName[]>;
  public generatedName:GeneratedName;

  constructor( private _angularFirestore: AngularFirestore ) { }

  getMaleName( id:number ){
    this.itemName = this._angularFirestore.collection( 'bpdata/name_generator/es_m_names/', ref => ref.where('id', '==' , id) );
    return this.name = this.itemName.valueChanges();
  }
  
  getFemaleName( id:number ){
    this.itemName = this._angularFirestore.collection( 'bpdata/name_generator/es_f_names/', ref => ref.where('id', '==' , id) );
    return this.name = this.itemName.valueChanges();
  }

  getLastName( id:number ){
    this.itemLastName = this._angularFirestore.collection( `bpdata/name_generator/es_last_names/`, ref => ref.where('id', '==' , id) );
    return this.lastName = this.itemLastName.valueChanges();
  }

}
