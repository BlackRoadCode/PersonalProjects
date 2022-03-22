import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from "../interfaces/user.interface";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { RoleValidator } from '../helpers/role-validator';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RoleValidator {

  public user$: Observable<User>;

  constructor(public angularFireAuth: AngularFireAuth, private _angularFirestore:AngularFirestore) {
    super(); 
    this.getUser();
  }

  getUser(){
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap( (user) => {
        if ( user ){          
           return this._angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of( null );
      })
    );
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.angularFireAuth.signInWithEmailAndPassword(email, password);

      user.getIdToken().then( res => {
        // console.log('Respuesta de getIdToken de user: ', res);
        // console.log('Esto trae refresh token', user.refreshToken);
        
      } );
      
       return user;
    } catch (err) {
      return err;
    }
  }

  async loginGoogle(){
    try {
      const { user } = await this.angularFireAuth.signInWithPopup( new firebase.auth.GoogleAuthProvider() );
      return user;
    } catch (error) {
      return error;
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {

      const { user } = await this.angularFireAuth.createUserWithEmailAndPassword( email, password );

      if( !user.emailVerified ){
        this.createUserRecord( user );
      }

      await this.sendVerificationEmail();
      return user;

    } catch (error) {
      return error;
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.angularFireAuth.currentUser).sendEmailVerification();
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.angularFireAuth.sendPasswordResetEmail(email);
    } catch (error) {
      return error;
    }
  }

  async logout() {
    try {
      await this.angularFireAuth.signOut();
    } catch (error) {
      return error;      
    }
  }

  getCurrentUser() {
    return this.angularFireAuth.currentUser;
  }

  createUserRecord( user:User ){
    const userRef : AngularFirestoreDocument<User> = this._angularFirestore.collection( 'users' ).doc(user.uid);    

    const data:User = { 
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      role: 'USER'
    };

    return userRef.set( data, { merge:true });
  }

  updateUserRecord( data:User ){
    const userDB: AngularFirestoreDocument<User> = this._angularFirestore.collection('users').doc(data.uid);
    userDB.update(data);
  }

}
