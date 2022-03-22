import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Term } from '../interfaces/dictionary.term.interface';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private itemTerm: AngularFirestoreCollection<Term>;
  public term:Observable<Term[]>;

  constructor( private _angularFirestore: AngularFirestore ) { }

  getTerm( url:string ){
    this.itemTerm = this._angularFirestore.collection( url );
    return this.term = this.itemTerm.valueChanges();
  }
  
}
