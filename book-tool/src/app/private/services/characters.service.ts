import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private itemsCollection: AngularFirestoreCollection<Character>;
  private item: AngularFirestoreDocument<Character>;
  public character: Character; 
  characters: Observable<Character[]>;

  constructor(private _angularFirestore: AngularFirestore) { }

  createCharacter(data: Character, user: User) {
    const characterDB: AngularFirestoreDocument<Character> = this._angularFirestore.collection('characters').doc(user.uid).collection('character').doc(data.cid);
    return characterDB.set(data, { merge: true });
  }

  updateCharacter(data: Character, user: User): void {
    const characterDB: AngularFirestoreDocument<Character> = this._angularFirestore.collection('characters').doc(user.uid).collection('character').doc(data.cid);
    characterDB.update(data);
  }

  getCharacter(idUser: string, idCharacter: string): Observable<Character> {
    this.item = this._angularFirestore.doc<Character>(`characters/${idUser}/character/${idCharacter}`);
    return this.item.valueChanges();
  }

  getNumberOfCharacters(idUser: string, numItems:number): Observable<Character[]> {
    this.itemsCollection = this._angularFirestore.collection<Character>(`characters/${idUser}/character`, ref => ref.limit(numItems));
    return this.characters = this.itemsCollection.valueChanges();
  }

  getCharacters(idUser: string): Observable<Character[]> {
    this.itemsCollection = this._angularFirestore.collection<Character>(`characters/${idUser}/character`);
    return this.characters = this.itemsCollection.valueChanges();
  }

  deleteCharacter(idUser: string, idCharacter: string) {
    this.item = this._angularFirestore.doc<Character>(`characters/${idUser}/character/${idCharacter}`);
    return this.item.delete();
   }
}
