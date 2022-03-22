import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private itemsCollection: AngularFirestoreCollection<Note>;
  private item: AngularFirestoreDocument<Note>;
  public note: Note;
  notes: Observable<Note[]>;

  constructor( private _angularFirestore: AngularFirestore ){ }

  createNote( data:Note, user:User ){ 
    const noteDB: AngularFirestoreDocument<Note> = this._angularFirestore.collection('notes').doc(user.uid).collection('note').doc(data.nid);
    return noteDB.set(data, { merge: true });
  }

  updateNote( data: Note, user: User ){
    const noteDB: AngularFirestoreDocument<Note> = this._angularFirestore.collection('notes').doc(user.uid).collection('note').doc(data.nid);
    noteDB.update(data);
  }

  getNotes( userId:string ):Observable<Note[]>{
    this.itemsCollection = this._angularFirestore.collection<Note>(`notes/${userId}/note`);
    return this.notes = this.itemsCollection.valueChanges();
  }
  
  getNumberOfNotes( userId:string, numItems:number ):Observable<Note[]>{
    this.itemsCollection = this._angularFirestore.collection( `notes/${userId}/note`, ref => ref.orderBy('priority', 'asc').limit(numItems) );
    return this.notes = this.itemsCollection.valueChanges();
  }

  deleteNote(idUser: string, idNote: string) {
    this.item = this._angularFirestore.doc<Note>(`notes/${idUser}/note/${idNote}`);
    return this.item.delete();
   }

}
