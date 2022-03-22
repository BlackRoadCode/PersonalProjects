import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/auth/interfaces/user.interface';
import Swal from 'sweetalert2';

import { Task, TasksList } from 'src/app/private/interfaces/tasks.interface';
import { TasksService } from 'src/app/private/services/tasks.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Reloader } from 'src/app/private/models/reloader.class';

@Component({
  selector: 'app-cetasks',
  templateUrl: './cetasks.component.html',
  styleUrls: ['./cetasks.component.css']
})
export class CetasksComponent implements OnInit {

  constructor(
    private _router:Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _tasksService: TasksService,
    private _activatedRoute:ActivatedRoute,
    private _angularFirestore: AngularFirestore
  ) { this.createForm(); }

  public taskListForm: FormGroup;
  public tasksArr:Task[] = [];
  public task:TasksList;
  public user: User;
  public editTaskListFlag = false;
  public reloader = new Reloader(this._router);

  ngOnInit(): void {

    this._authService.user$.subscribe( user => {
      this.user = user;

      this._activatedRoute.params.subscribe( ({ action }) => {
      
        if ( action !== 'new' ){

          this.editTaskListFlag = true;
          
          this.getTask( this.user.uid, action ).subscribe( res => {

            this.taskListForm = this._formBuilder.group({
              title: [ res.tltitle ],
              tasks: this._formBuilder.array([])
            });

            for (let i = 0; i < res.tasks.length; i++) {
              this.tasks.push( this._formBuilder.control( res.tasks[i].description, Validators.required ) );
            }
            
            this.task = res;

          } );

          return;
        } else {
          this.addTask();

        }
        
      });
    });

  }

  getTask( idUser:string, taskId:string ){
    return this._tasksService.getTaskList( idUser, taskId );
  }

  get tasks(): FormArray {
    return this.taskListForm.get('tasks') as FormArray;
  }

  createForm() {
    this.taskListForm = this._formBuilder.group({
      title: ['', Validators.required],
      tasks: this._formBuilder.array([])
    });
  }

  addTask() {
    this.tasks.push( this._formBuilder.control( '', Validators.required ) );
  }

  deleteTask(i: number) {
    if ( i !== 0 ){
      this.tasks.removeAt(i);
    }
  }

  cancelTaskList(){
    this.taskListForm.reset();
    this._router.navigate(['private', 'dashboard', 'tasks']);
  }

  saveTaskList(){

    if ( this.taskListForm.valid ){
      let arrTemp = this.taskListForm.get('tasks').value;
  
      for ( let i = 0 ; i < arrTemp.length ; i++ ) {
        
        let taskTemp:Task = {
          description: arrTemp[i],
          creationDate:new Date().toDateString()
        } 
  
        this.tasksArr.push(taskTemp);  
      }
      
      const data: TasksList = {
        lid:this._angularFirestore.createId(),
        tltitle:this.taskListForm.get('title').value,
        tasks:this.tasksArr
      }
  
      this._tasksService.createTaskList( data, this.user ).then( () => {

        let counter = Number(localStorage.getItem('bp_ta'));
        counter++;
        localStorage.setItem('bp_ta', counter.toString());

        Swal.fire({
          icon:'success',
          title:'Registro guardado',
          text:'La nota ha sido guardado exitosamente'
        });
        
        this.reloader.reloadComponent();
        this._router.navigate(['private','dashboard','tasks']);
      }).catch( error => {
        Swal.fire({
          title:'Error al guardar el registro',
          icon:'error',
          text:'Hubo un error al guardar el registro'
        });
      });

    }
    
  }
  
  editTaskList(task:TasksList){

      let firstArray = task.tasks;
      let newArray = this.taskListForm.get('tasks').value;
      let arrTemp = [];

      if ( newArray.length > firstArray.length  ) {
        for ( let i = firstArray.length ; i < newArray.length ; i++ ) {
          let taskTemp:Task = {
            description: newArray[i],
            creationDate: new Date().toDateString(),
          } 
          task.tasks.push(taskTemp);
        }  
      }
      
      arrTemp = this.taskListForm.get('tasks').value;

      for (let i = 0; i < task.tasks.length; i++) {
        task.tasks[i].description = arrTemp[i];
      }
      
      const data: TasksList = {
        lid:this.task.lid,
        tltitle:this.taskListForm.get('title').value,
        tasks:task.tasks
      }
  
      this._tasksService.updateTaskList( data, this.user ).then( res => {
        Swal.fire({
          icon:'success',
          title:'Registro Actualizado',
          text:'La lista ha sido actualizada exitosamente'
        });
  
        this._router.navigate(['private','dashboard','tasks']);
      }).catch( error => {
        Swal.fire({
          title:'Error al guardar el registro',
          icon:'error',
          text:'Hubo un error al guardar el registro'
        });
      });
    
  }

  deleteTaskInTaskList(idTask:number){
    this.tasks.removeAt(idTask);
    this.task.tasks.splice( idTask, 1 ); 
  }

}
