import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Timeline, TimelineNode } from 'src/app/private/interfaces/timelines.interface';
import { TimeLineService } from 'src/app/private/services/time-line.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cetimeline',
  templateUrl: './cetimeline.component.html',
  styleUrls: ['./cetimeline.component.css']
})
export class CetimelineComponent implements OnInit {

  public user:User;
  public timeline:Timeline = {
    tlid:'',
    title:'',
    nodes:[]
  };
  public idTimeline:string;
  public editNodeFlag = false;
  public addNodeFlag = false;
  public node:TimelineNode;
  public indexNode:number = null;
  public nodeTitle:string='';
  public fileName:string = '';
  public exportTimeline:boolean = false;

  public userToken = localStorage.getItem('nm_tu');

  public nodeForm: FormGroup = this._formBuilder.group({
    nodeTitle:[''],
    factDate:[''],
    nodeColor:[''],
    textNode:['']
  });

  pdfConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'quill-editor-content', 
  }

  constructor( 
    private _authService:AuthService, 
    private _activatedRoute:ActivatedRoute, 
    private _timelineService:TimeLineService, 
    private _router:Router, 
    private _formBuilder:FormBuilder,
    private _angularFirestore:AngularFirestore,
    private _toastrService: ToastrService,
    private _exportAsService: ExportAsService
    ){ }
    
    ngOnInit(): void {
     this._authService.user$.subscribe( user => {
       this.user = user;
       this._activatedRoute.params.subscribe( ({ id }) => {
         this.getTimeLine( user, id );
         this.setUserItems();
       });
 
     });
   }

   private setUserItems() {

    let finishDateFromData = this.userToken.substr(19,2) + '/' + this.userToken.substr(13,2) + '/20' + this.userToken.substr(25,2);
    let finishDate = new Date(finishDateFromData);
    let todayDate = new Date();
    let typeUser = this.userToken.substr(44, 3);

    if ( todayDate > finishDate ) {
      this.exportTimeline = false;
      return;
    } else {
      switch (typeUser) {
        // LEVEL_A
        case '132':
          this.exportTimeline = false;
          break;
        // LEVEL_B
        case '489':
          this.exportTimeline = false;
          break;
        // LEVEL_C
        case '273':
          this.exportTimeline = true;
          break;
        // LEVEL_D
        case '621':
          this.exportTimeline = true;
          break;
          // ADMIN
        case '142':
          this.exportTimeline = true;
          break;
  
        default:
          break;
      }
    }

  }

   exportAsPDF( name:string ) {
    this._exportAsService.save( this.pdfConfig, name ).pipe(  ).subscribe( res => {
      console.log( res );
    });
  }

  getTimeLine( user:User, timelineId:string ){
    this._timelineService.getTimeline( user, timelineId ).subscribe( res => {
      this.timeline = res;
      this.fileName = this.timeline.title;
    });
  }

  editNode(node:TimelineNode, action:string){
    this.editNodeFlag = true;
    if ( action === 'new' ){ return; }

    this.nodeForm.setValue({
      nodeTitle: node.nodeTitle,
      factDate: node.factDate,
      nodeColor: node.nodeColor,
      textNode: node.textNode
    });

    this.nodeTitle = node.nodeTitle;
  }

  deleteNode(i: number) {
    this.timeline.nodes.splice( i, 1 );

    for ( let i = 0 ; i < this.timeline.nodes.length ; i++ ) {
      (i%2 !== 0)? this.timeline.nodes[i].nodeClass = 'timeline-inverted':this.timeline.nodes[i].nodeClass = '';
    }

    const data: Timeline = {
      tlid:this.timeline.tlid,
      title:this.timeline.title,
      nodes:this.timeline.nodes
    }

    this._timelineService.updateTimeline( data, this.user ).then( res => {      
      this.showToast( 'delete' );
      this._router.navigate(['private','dashboard','time-line', this.timeline.tlid]);
    });
    
  }

  updateNode(i:number) {

    const nodeTemp: TimelineNode = {
      nid:this._angularFirestore.createId(),
      nodeTitle:this.nodeForm.get('nodeTitle').value,
      textNode:this.nodeForm.get('textNode').value,
      factDate:this.nodeForm.get('factDate').value,
      nodeColor:this.nodeForm.get('nodeColor').value
    }

    //insertar elemento
    this.timeline.nodes.splice( i, 1, nodeTemp );

    // Reajustar clases
    for ( let i = 0 ; i < this.timeline.nodes.length ; i++ ) {
      (i%2 !== 0)? this.timeline.nodes[i].nodeClass = 'timeline-inverted':this.timeline.nodes[i].nodeClass = '';
    }

    // crear data para actualizar
    const data: Timeline = {
      tlid:this.timeline.tlid,
      title:this.timeline.title,
      nodes:this.timeline.nodes
    }

    this._timelineService.updateTimeline( data, this.user ).then( res => {
      
      this.showToast( 'edit' );

      this.nodeForm.reset();
      this.indexNode = null;
      this.editNodeFlag = false;
      this._router.navigate(['private','dashboard','time-line', this.timeline.tlid]);
    });
    
  }

  cancelUpdateNode(){    
    this.nodeForm.reset();
    this.editNodeFlag = false;
    this.addNodeFlag = false;
  }

  addNode(i:number) {

    const nodeTemp: TimelineNode = {
      nid:this._angularFirestore.createId(),
      nodeTitle:this.nodeForm.get('nodeTitle').value,
      textNode:this.nodeForm.get('textNode').value,
      factDate:this.nodeForm.get('factDate').value,
      nodeColor:this.nodeForm.get('nodeColor').value
    }

    this.timeline.nodes.splice( i, 0, nodeTemp );

    for ( let i = 0 ; i < this.timeline.nodes.length ; i++ ) {
      (i%2 !== 0)? this.timeline.nodes[i].nodeClass = 'timeline-inverted':this.timeline.nodes[i].nodeClass = '';
    }

    const data: Timeline = {
      tlid:this.timeline.tlid,
      title:this.timeline.title,
      nodes:this.timeline.nodes
    }

    this._timelineService.updateTimeline( data, this.user ).then( res => {
      
      this.showToast( 'add' );
      
      this.nodeForm.reset();
      this.addNodeFlag = false;
      this._router.navigate(['private','dashboard','time-line', this.timeline.tlid]);
    });
    
  }
  
  showToast( typeToast:string ) {

    switch (typeToast) {
      case 'add':
        this._toastrService.success('El nodo fue añadido exitosamente', 'Nodo Añadido', { timeOut:2000, positionClass:'toast-bottom-right', closeButton:true } );
        return;

        case 'edit':
          this._toastrService.info('El nodo fue editado exitosamente', 'Nodo Editado', { timeOut:2000, positionClass:'toast-bottom-right', closeButton:true } );
        return;

        case 'delete':
          this._toastrService.error('El nodo fue eliminado exitosamente', 'Nodo Eliminado', { timeOut:2000, positionClass:'toast-bottom-right', closeButton:true } );
        return;
    }

  }

  getPremium(){
    Swal.fire({
        icon: 'warning',
        title: 'No es posible exportar',
        text: 'Tu nivel de cuenta no cuenta con esta característica.'
      });
  }
  
}
