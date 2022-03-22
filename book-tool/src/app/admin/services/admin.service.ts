import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private itemsCollection: AngularFirestoreCollection<User>;
  private item: AngularFirestoreDocument<User>;
  users:Observable<User[]>;

  constructor( 
    public angularFireAuth: AngularFireAuth, 
    private _angularFirestore:AngularFirestore 
    ) { }

  getUsers():Observable<User[]>{
    this.itemsCollection = this._angularFirestore.collection<User>('users');
    return this.users = this.itemsCollection.valueChanges();
  }

  updateUser( data:User, user:User ){
    const userRef : AngularFirestoreDocument<User> = this._angularFirestore.collection( 'users' ).doc(user.uid);
    return userRef.update( data );
  }

  deleteUser( userID:string ){
    this.item = this._angularFirestore.doc<User>(`users/${userID}`);
    return this.item.delete();
  }

  getAllInfo(){}

  getContactMessages(){}

}
