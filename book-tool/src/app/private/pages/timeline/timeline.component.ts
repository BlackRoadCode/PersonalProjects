import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Timeline, TimelineNode } from '../../interfaces/timelines.interface';
import { Reloader } from '../../models/reloader.class';
import { TimeLineService } from '../../services/time-line.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: [ './timeline.component.css' ]
})

export class TimelineComponent implements OnInit {

  public timelineForm: FormGroup;
  public timelines:Timeline[] = [];
  public nodeArr:TimelineNode[] = [];
  public user: User;
  public numberTimelines:number;
  public newTimeline = false;
  public viewCard = true;
  public viewList = false;
  public reloader = new Reloader( this._router );
  public numberTimelinesCreated: number;
  public userToken = localStorage.getItem('bp_tu');

  /* User Items */
  public numNotes: number;
  public msgPremiumAccount:boolean = false;

  constructor( 
    private _formBuilder:FormBuilder,
    private _authService:AuthService, 
    private _angularFirestore:AngularFirestore, 
    private _timelineService:TimeLineService, 
    private _router:Router
    ){ }
    
  ngOnInit(): void {
    this._authService.user$.subscribe( user => {
      this.user = user;
      this.setUserItems();
      // this.getTimelines( this.user );
    });

    this.validateView();
    this.createForm();
    this.addNode();
  }

  validateView() {
    let view: string = localStorage.getItem('bp_tl');

    if (view === 'l') {
      this.viewCard = false;
      this.viewList = true;
    } else {
      this.viewCard = true;
      this.viewList = false;
    }
  }

  private setUserItems() {

    let finishDateFromData = this.userToken.substr(19,2) + '/' + this.userToken.substr(13,2) + '/20' + this.userToken.substr(25,2);
    let finishDate = new Date(finishDateFromData);
    let todayDate = new Date();
    let typeUser = this.userToken.substr(44, 3);

    if ( todayDate > finishDate ) {
      this.numberTimelines = 1;
      this.msgPremiumAccount = true;
      this.getNumberOfTimelines(this.numberTimelines);
      return;
    } else {
      switch (typeUser) {
        // LEVEL_A
        case '132':
          this.numberTimelines = 1;
          break;
        // LEVEL_B
        case '489':
          this.numberTimelines = 3;
          break;
        // LEVEL_C
        case '273':
          this.numberTimelines = 10;
          break;
        // LEVEL_D
        case '621':
          this.numberTimelines = 999;
          break;
          // ADMIN
        case '142':
          this.numberTimelines = 999;
          break;
  
        default:
          console.log('Este usuario no tiene user token, revisar', this.userToken);
          break;
      }
      this.getNumberOfTimelines(this.numberTimelines);
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

  setTimelineView(view: string) {

    if (view === 'c') {
      this.viewCard = true;
      this.viewList = false;
    } else {
      this.viewCard = false;
      this.viewList = true;
    }

    localStorage.setItem('bp_tl', view);
  }

  get nodes(): FormArray {
    return this.timelineForm.get('nodes') as FormArray;
  }

  createForm() {
    this.timelineForm = this._formBuilder.group({
      title: ['', Validators.required],
      type: [''],
      nodes: this._formBuilder.array([])
    });
  }

  addNode() {
    this.nodes.push( this._formBuilder.group( 
      { 
        nodeTitle:[''],
        textNode:[''], 
        factDate:[''],
        nodeColor:['']
      }
      ));
  }

  saveTimeline(){

    if ( this.timelineForm.valid ){
      let arrTemp = this.timelineForm.get('nodes').value;
      let nodeClass;
  
      for ( let i = 0 ; i < arrTemp.length ; i++ ) {

        (i%2 !== 0)?nodeClass = 'timeline-inverted':nodeClass = '';

        let tlNodeTemp:TimelineNode = {
          nid:this._angularFirestore.createId(),
          nodeTitle:arrTemp[i].nodeTitle,
          textNode:arrTemp[i].textNode,
          factDate:arrTemp[i].factDate,
          nodeColor:arrTemp[i].nodeColor,
          nodeClass:nodeClass
        } 
  
        this.nodeArr.push(tlNodeTemp);  
      }
      
      const data: Timeline = {
        tlid:this._angularFirestore.createId(),
        title:this.timelineForm.get('title').value,
        type:this.timelineForm.get('type').value,
        creationDate: new Date().toDateString(),
        nodes:this.nodeArr
      }      

      this._timelineService.createTimeLine( data, this.user ).then( () => {

        let counter = Number(localStorage.getItem('bp_ti'));
        counter++;
        localStorage.setItem('bp_ti', counter.toString());

        Swal.fire({
          icon:'success',
          title:'Registro guardado',
          text:'La línea de tiempo ha sido guardado exitosamente'
        });
  
        this.reloader.reloadComponent();
        this.timelineForm.reset();
        this.newTimeline = false;
        this._router.navigate(['private','dashboard','time-line']);
      }).catch( () => {
        Swal.fire({
          title:'Error al guardar el registro',
          icon:'error',
          text:'Hubo un error al guardar el registro'
        });
      });

    }
    
  }

  deleteNode( i:number ){
    if ( i !== 0 ){
      this.nodes.removeAt(i);
    }
  }

  deleteTimeline( idTL:string ){
    Swal.fire({
      title: '¿Borrar Timeline?',
      html: `Está a punto de borrar un timeline`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#58A4B0',
      cancelButtonColor: '#FF332E',
      confirmButtonText: 'Confirmar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        
        this._timelineService.deleteTimeline( this.user.uid, idTL ).then( () => {

          let counter = Number(localStorage.getItem('bp_ti'));
          counter--;
          localStorage.setItem('bp_ti', counter.toString());

          Swal.fire(
            'Borrado!',
            'El registro ha sido borrado.',
            'success'
          );

          this.reloader.reloadComponent();
          this.getTimelines(  );
        });
   
      }
    })
  }

  getTimelines(  ){
    this._timelineService.getTimelines( this.user.uid ).subscribe( timelines => {
      this.numberTimelines = timelines.length;
      this.timelines = timelines;      
    } );
  }
  
  getNumberOfTimelines( numOfTimelines:number ){
    this._timelineService.getNumberOfTimelines( this.user.uid, numOfTimelines ).subscribe( timelines => {
      this.timelines = timelines;
      this.numberTimelinesCreated = timelines.length;
    } );
  }

  getTimelinesObs( user:User ){
    this._timelineService.getTimelines( this.user.uid ).pipe(
      map<Timeline[], Timeline[]>( val => {

        val.forEach( timeline => {

          for (let i = 0; i < timeline.nodes.length; i++) {
            
            if( i%2 === 0){
              timeline.nodes[i].nodeClass = 'timeline-inverted';
            } else {
              timeline.nodes[i].nodeClass = '';
            }
            
          }
          
        });
        
        return val;
      })
    ).subscribe( res => {
      this.timelines = res;
    } );
  }

}
