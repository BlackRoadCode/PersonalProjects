import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Inspiration } from '../interfaces/inspiration.interface';

@Injectable({
  providedIn: 'root'
})
export class InspirationsService {

  private itemsCollection: AngularFirestoreCollection<Inspiration>;
  private item: AngularFirestoreDocument<Inspiration>;
  public inspiration: Inspiration;
  inspirations: Observable<Inspiration[]>;

  constructor( private _angularFirestore: AngularFirestore ){ }

  createInspiration( data:Inspiration, user:User ){ 
    const inspirationDB: AngularFirestoreDocument<Inspiration> = this._angularFirestore.collection('inspirations').doc(user.uid).collection('inspiration').doc(data.iid);
    return inspirationDB.set(data, { merge: true });
  }

  updateInspiration( data: Inspiration, user: User ){
    const inspirationDB: AngularFirestoreDocument<Inspiration> = this._angularFirestore.collection('inspirations').doc(user.uid).collection('inspiration').doc(data.iid);
    inspirationDB.update(data);
  }

  getInspirations( userId:string ):Observable<Inspiration[]>{
    this.itemsCollection = this._angularFirestore.collection<Inspiration>(`inspirations/${userId}/inspiration`);
    return this.inspirations = this.itemsCollection.valueChanges();
  }

  getNumberOfInspirations( userId:string, numItems:number ):Observable<Inspiration[]>{
    this.itemsCollection = this._angularFirestore.collection( `inspirations/${userId}/inspiration`, ref => ref.orderBy('title', 'asc').limit(numItems) );
    return this.inspirations = this.itemsCollection.valueChanges();
  }

  deleteInspirations(idUser: string, idInspiration: string) {
    this.item = this._angularFirestore.doc<Inspiration>(`inspirations/${idUser}/inspiration/${idInspiration}`);
    return this.item.delete();
   }

}
