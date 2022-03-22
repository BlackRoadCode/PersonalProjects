import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Work } from '../interfaces/works.interface';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  private itemsCollection: AngularFirestoreCollection<Work>;
  private item: AngularFirestoreDocument<Work>;
  public work: Work; 
  works: Observable<Work[]>;

  constructor(private _angularFirestore: AngularFirestore) { }

  createWork( data:Work, user:User ){
    const workDB: AngularFirestoreDocument<Work> = this._angularFirestore.collection('works').doc(user.uid).collection('work').doc(data.wid);
    return workDB.set(data, { merge: true });
  }

  getNumberOfWorks(idUser: string, numItems:number): Observable<Work[]> {
    this.itemsCollection = this._angularFirestore.collection( `works/${idUser}/work`, ref => ref.orderBy('woid', 'desc').limit(numItems) );
    return this.works = this.itemsCollection.valueChanges();
  }

  getWorks(idUser: string, numItems:number): Observable<Work[]> {
    this.itemsCollection = this._angularFirestore.collection( `works/${idUser}/work`, ref => ref.orderBy('woid', 'asc').limit(numItems) );
    return this.works = this.itemsCollection.valueChanges();
  }
  
  getWorksLength(idUser: string): Observable<Work[]> {
    this.itemsCollection = this._angularFirestore.collection( `works/${idUser}/work`);
    return this.works = this.itemsCollection.valueChanges();
  }

  getWork( idUser:string, idWork:string ){
    this.item = this._angularFirestore.doc<Work>(`works/${idUser}/work/${idWork}`);
    return this.item.valueChanges();
  }

  updateWork( idUser:string, data:Work ){
    const workDB: AngularFirestoreDocument<Work> = this._angularFirestore.collection('works').doc(idUser).collection('work').doc(data.wid);
    return workDB.update(data);
  }

}
