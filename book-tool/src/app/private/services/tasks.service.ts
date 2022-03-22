import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Task, TasksList } from '../interfaces/tasks.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private itemsCollection: AngularFirestoreCollection<Task>;
  private item: AngularFirestoreDocument<Task>;
  private itemTL: AngularFirestoreDocument<TasksList>;
  editTaskList = false;
  taskList: Observable<Task[]>;

  constructor( private _angularFirestore:AngularFirestore ) { } 

  createTaskList( data:TasksList, user:User ){ 
    const TaskListDB: AngularFirestoreDocument<TasksList> = this._angularFirestore.collection('tasks').doc(user.uid).collection('task').doc(data.lid);
    return TaskListDB.set(data, { merge: true });
  }
  
  updateTaskList( data:TasksList, user:User ){ 
    const TaskListDB: AngularFirestoreDocument<TasksList> = this._angularFirestore.collection('tasks').doc(user.uid).collection('task').doc(data.lid);
    return TaskListDB.update(data);
  }

  getTaskLists(idUser: string): Observable<Task[]> {
    this.itemsCollection = this._angularFirestore.collection<Task>(`tasks/${idUser}/task`);
    return this.taskList = this.itemsCollection.valueChanges();
  }
  
  getNumberOfTasksLists(idUser: string, numItems:number): Observable<Task[]> {
    this.itemsCollection = this._angularFirestore.collection<Task>(`tasks/${idUser}/task`, ref => ref.orderBy('tltitle','asc').limit(numItems));
    return this.taskList = this.itemsCollection.valueChanges();
  }
  
  getTaskList( idUser:string, taskListId:string ):Observable<TasksList>{
    this.itemTL = this._angularFirestore.doc<TasksList>(`tasks/${idUser}/task/${taskListId}`);
    return this.itemTL.valueChanges();
  }

  deleteTaskList( idUser: string, taskListId: string ){
    this.item = this._angularFirestore.doc<Task>(`tasks/${idUser}/task/${taskListId}`);
    return this.item.delete();
  }

}
