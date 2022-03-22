import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { Task, TasksList } from '../../interfaces/tasks.interface';
import { TasksService } from '../../services/tasks.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Reloader } from '../../models/reloader.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css' ]
})
export class TasksComponent implements OnInit {

  public user:User;
  public taskList:Task[] = [];
  public numberTasks:number;
  public addTasksForm: FormGroup;
  public viewCard = true;
  public viewList = false;
  public numberTasksCreated: number;
  public reloader = new Reloader(this._router);
  public userToken = localStorage.getItem('bp_tu');

  /* User Items */
  public numNotes: number;
  public msgPremiumAccount:boolean = false;

  constructor( 
    private _router:Router,
    private _formBuilder:FormBuilder,
    private _authService:AuthService, 
    private _tasksService:TasksService,
    private _toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe( user => {
      this.user = user;
      this.setUserItems();
    });

    this.validateView();
  }

  validateView() {
    let view: string = localStorage.getItem('bp_tv');

    if (view === 'c') {
      this.viewCard = true;
      this.viewList = false;
    } else {
      this.viewCard = false;
      this.viewList = true;
    } 
  }

  private setUserItems() {

    let finishDateFromData = this.userToken.substr(19,2) + '/' + this.userToken.substr(13,2) + '/20' + this.userToken.substr(25,2);
    let finishDate = new Date(finishDateFromData);
    let todayDate = new Date();
    let typeUser = this.userToken.substr(44, 3);

    if ( todayDate > finishDate ) {
      this.numberTasks = 3;
      this.msgPremiumAccount = true;
      this.getNumberOfTasksLists(this.numberTasks);
      return;
    } else {
      switch (typeUser) {
        // LEVEL_A
        case '132':
          this.numberTasks = 3;
          break;
        // LEVEL_B
        case '489':
          this.numberTasks = 5;
          break;
        // LEVEL_C
        case '273':
          this.numberTasks = 10;
          break;
        // LEVEL_D
        case '621':
          this.numberTasks = 999;
          break;
          // ADMIN
        case '142':
          this.numberTasks = 999;
          break;
  
        default:
          console.log('Este usuario no tiene user token, revisar', this.userToken);
          break;
      }
      this.getNumberOfTasksLists(this.numberTasks);
    }

  }

  formatStartDate( date ){

    date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    // let year = date.getFullYear().toString().substr(-2);
    let year = date.getFullYear().toString();

    month = (month + 1).toString();

    if ( month.length === 1 ){ month = "0" + month; }
    if ( day.length === 1 ){ day = "0" + day; }

    return month + '/' + day + '/' + year;
  }

  setTasksView(view: string) {

    if (view === 'c') {
      this.viewCard = true;
      this.viewList = false;
    } else {
      this.viewCard = false;
      this.viewList = true;
    }

    localStorage.setItem('bp_tv', view);
  }

  createForm() {
    this.addTasksForm = this._formBuilder.group({
      tasks: this._formBuilder.array([])
    });
  }

  get tasks(): FormArray {
    return this.addTasksForm.get('tasks') as FormArray;
  }

  getTaskLists( userId:string ){
    this._tasksService.getTaskLists( userId ).subscribe( tasks => {
      this.numberTasks = tasks.length;
      return this.taskList = tasks;
    });
  }
  
  getNumberOfTasksLists( numOfTasksLists:number ){
    this._tasksService.getNumberOfTasksLists( this.user.uid, numOfTasksLists ).subscribe( tasks => {
      this.taskList = tasks;
      this.numberTasksCreated = tasks.length;
    });
  }

  deleteList( taskId:string ){
    Swal.fire({
      title: '¿Borrar Lista de Tareas?',
      html: `<small>Está a punto de borrar una lista de tareas (todas las tareas relacionadas se borrarán también)<small>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#58A4B0',
      cancelButtonColor: '#FF332E',
      confirmButtonText: 'Confirmar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        
        this._tasksService.deleteTaskList( this.user.uid, taskId ).then( () => {
          
          let counter = Number(localStorage.getItem('bp_ta'));
          counter--;
          localStorage.setItem('bp_ta', counter.toString());

          Swal.fire(
            'Borrado!',
            'El registro ha sido borrado.',
            'success'
          );
          
          this.reloader.reloadComponent();
          this.getTaskLists( this.user.uid );
        });
   
      }
    })
  }
      
  deleteTaskFromHub(taskList:TasksList, i:number){
      taskList['tasks'].splice(i, 1);
      this._tasksService.updateTaskList( taskList, this.user ).then( res => {
        this.showToast( 'order' );
      });
  }

  addList( tid:string ){
    console.log(tid);
  }

  addTask() {
    this.tasks.push( this._formBuilder.control( '', Validators.required ) );
  }

  updateTaskStatus(taskList:TasksList, task:Task){

      task.status = !task.status;
      task.endDate = new Date().toDateString();

      this._tasksService.updateTaskList( taskList, this.user ).then( res => {        

        if ( task.status ){
          this.showToast( 'solved' );
        } else {
          this.showToast( 'unsolved' );
        }
  
      }).catch( error => {
        Swal.fire({
          title:'Error al guardar el registro',
          icon:'error',
          text:'Hubo un error al guardar el registro'
        });
      });

  }

  showToast( typeToast:string ) {

    switch (typeToast) {
      case 'solved':
        this._toastrService.success('La tarea fue marcada como resuelta.', 'Tarea Actualizada', { timeOut:2000, positionClass:'toast-bottom-right', closeButton:true } );
        return;

        case 'unsolved':
          this._toastrService.info('La tarea fue marcada como no resuelta.', 'Tarea Actualizada', { timeOut:2000, positionClass:'toast-bottom-right', closeButton:true } );
        return;
        
        case 'order':
          this._toastrService.info('La lista fue actualizada exitosamente.', 'Lista Actualizada', { timeOut:1500, positionClass:'toast-bottom-right', closeButton:true } );
        return;
    }

  }

  drop(event:CdkDragDrop<Task>, list:TasksList){
    moveItemInArray( list.tasks, event.previousIndex, event.currentIndex );

    this._tasksService.updateTaskList( list, this.user ).then( res => {
      
      this.showToast( 'order' );

    }).catch( error => {
      Swal.fire({
        title:'Error al guardar el registro',
        icon:'error',
        text:'Hubo un error al guardar el registro'
      });
    });

  }

  getPremium(){
    Swal.fire({
        icon: 'warning',
        title: 'Consigue Premium',
        text: 'Has alcanzado el límite de listas de tareas creadas para tu nivel de cuenta, para crear más listas obtén tu cuenta premium, es muy accesible y nos ayuda a seguir online.'
      });
  }

}
