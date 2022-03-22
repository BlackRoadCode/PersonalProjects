import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Timeline } from '../interfaces/timelines.interface';

@Injectable({
  providedIn: 'root'
})
export class TimeLineService {

  private itemsCollection: AngularFirestoreCollection<Timeline>;
  private item: AngularFirestoreDocument<Timeline>;
  public timeline: Timeline;
  timelines: Observable<Timeline[]>;

  constructor( private _angularFirestore: AngularFirestore ) { }

  createTimeLine( data:Timeline, user:User ){
    const TtimelineDB: AngularFirestoreDocument<Timeline> = this._angularFirestore.collection('timelines').doc(user.uid).collection('timeline').doc(data.tlid);
    return TtimelineDB.set(data, { merge: true });
  }

  deleteTimeline( idUser: string, idTimeline: string ){
    this.item = this._angularFirestore.doc<Timeline>(`timelines/${idUser}/timeline/${idTimeline}`);
    return this.item.delete();
  }

  getTimelines( userId:string ):Observable<Timeline[]>{
    this.itemsCollection = this._angularFirestore.collection<Timeline>(`timelines/${userId}/timeline`);
    return this.timelines = this.itemsCollection.valueChanges();
  }
  
  getNumberOfTimelines( userId:string, numItems:number ):Observable<Timeline[]>{
    this.itemsCollection = this._angularFirestore.collection<Timeline>(`timelines/${userId}/timeline`, ref => ref.orderBy('type', 'asc').limit(numItems));
    return this.timelines = this.itemsCollection.valueChanges();
  }
  
  getTimeline( user:User, timelineId:string ):Observable<Timeline>{
    this.item = this._angularFirestore.doc<Timeline>(`timelines/${user.uid}/timeline/${timelineId}`);
    return this.item.valueChanges();
  }

  updateTimeline( data:Timeline, user:User ){
    const TtimelineDB: AngularFirestoreDocument<Timeline> = this._angularFirestore.collection('timelines').doc(user.uid).collection('timeline').doc(data.tlid);
    return TtimelineDB.update(data);
  }

}
