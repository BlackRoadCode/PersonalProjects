import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { User } from 'src/app/auth/interfaces/user.interface';
import { Note } from '../../interfaces/note.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotesService } from '../../services/notes.service';
import { Reloader } from '../../models/reloader.class';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styles: [
  ]
})
export class NotesComponent implements OnInit {

  public user: User;
  public notes: Note[];
  public note: Note;
  public newFlag: boolean = false;
  public editFlag: boolean = false;
  public viewCard = true;
  public viewList = false;
  public numberNotesCreated: number;
  public reloader = new Reloader( this._router );
  
  public userToken = localStorage.getItem('bp_tu');

  /* User Items */
  public numNotes: number;
  public msgPremiumAccount:boolean = false;

  public noteForm: FormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    subtitle: [''],
    priority: [''],
    noteDetails: [''],
    lintText: [''],
    linkUrl: [''],
  });

  constructor(
    private _router: Router, 
    private _authService: AuthService, 
    private _notesService: NotesService, 
    private _formBuilder: FormBuilder, 
    private _angularFirestore: AngularFirestore,
    private _toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe(user => {
      this.user = user;
      this.setUserItems();
      // this.getNotes(this.user.uid);
    });

    this.validateView();
  }

  validateView() {
    let view: string = localStorage.getItem('bp_nv');

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
      this.numNotes = 10;
      this.msgPremiumAccount = true;
      this.getNumberOfNotes(this.numNotes);
      return;
    } else {
      switch (typeUser) {
        // LEVEL_A
        case '132':
          this.numNotes = 10;
          break;
        // LEVEL_B
        case '489':
          this.numNotes = 30;
          break;
        // LEVEL_C
        case '273':
          this.numNotes = 100;
          break;
        // LEVEL_D
        case '621':
          this.numNotes = 999;
          break;
          // ADMIN
        case '142':
          this.numNotes = 999;
          break;
  
        default:
          console.log('Este usuario no tiene user token, revisar', this.userToken);
          break;
      }
      this.getNumberOfNotes(this.numNotes);
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

  setNotesView(view: string) {

    if (view === 'c') {
      this.viewCard = true;
      this.viewList = false;
    } else {
      this.viewCard = false;
      this.viewList = true;
    }

    localStorage.setItem('bp_nv', view);
  }

  saveNote() {
    
      if ( this.noteForm.valid ) {

        const data: Note = {
          nid: this._angularFirestore.createId(), 
          title: this.noteForm.get('title').value,
          subtitle: this.noteForm.get('subtitle').value,
          priority: this.noteForm.get('priority').value,
          text: this.noteForm.get('noteDetails').value,
          textLink: this.noteForm.get('lintText').value,
          link: this.noteForm.get('linkUrl').value,
          creationDate: new Date().toDateString()
        }

        this._notesService.createNote(data, this.user).then(res => {
          this.showToast('add');
          this.noteForm.reset();

          let counter = Number(localStorage.getItem('bp_no'));
          counter++;
          localStorage.setItem('bp_no', counter.toString());

          this.reloader.reloadComponent();
          
          this.newFlag = false;
        });
      }
  }

  getNotes(userid: string) {
    this._notesService.getNotes(userid).subscribe(notes => {
      this.numberNotesCreated = notes.length;
      return this.notes = notes;
    });
  }

  getNumberOfNotes(numOfNotes:number){
    this._notesService.getNumberOfNotes(this.user.uid, numOfNotes).subscribe(notes => {
      this.notes = notes;
      this.numberNotesCreated = notes.length;
    });
  }

  loadNote(note: Note) {

    this.note = note;

    this.newFlag = true;
    this.editFlag = true;

    this.noteForm.setValue( {
      title:note.title,
      subtitle:note.subtitle,
      priority:note.priority,
      noteDetails:note.text,
      lintText:note.textLink,
      linkUrl:note.link
     });

  }

  editNote( note:Note ){

    const dataEdit: Note = {
      nid: note.nid,
      title: this.noteForm.get('title').value,
      subtitle: this.noteForm.get('subtitle').value,
      priority: this.noteForm.get('priority').value,
      text: this.noteForm.get('noteDetails').value,
      textLink: this.noteForm.get('lintText').value,
      link: this.noteForm.get('linkUrl').value
    }

    this._notesService.updateNote( dataEdit, this.user );
    this.showToast('edit');

    this.cancelNewNote();
  }

  deleteNote(note: Note) {
    Swal.fire({
      title: '¿Borrar Nota?',
      html: 'Está a punto de borrar esta nota',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#58A4B0',
      cancelButtonColor: '#FF332E',
      confirmButtonText: 'Confirmar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._notesService.deleteNote(this.user.uid, note.nid);
        
        let counter = Number(localStorage.getItem('bp_no'));
        counter--;
        localStorage.setItem('bp_no', counter.toString());

        Swal.fire(
          'Borrado!',
          'La nota fue eliminada con éxito.',
          'success'
        );

        this.reloader.reloadComponent();
        this.getNotes(this.user.uid);

      }
    })
  }

  cancelNewNote() {
    this.noteForm.reset();
    this.newFlag = false;
    this.editFlag = false;
  }

  showToast( typeToast:string ) {

    switch (typeToast) {
      case 'add':
        this._toastrService.success('La nota fue añadida exitosamente', 'Nota Añadida', { timeOut:2000, positionClass:'toast-bottom-right', closeButton:true } );

        return;

        case 'edit':
          this._toastrService.info('La nota fue editada exitosamente', 'Nota Editada', { timeOut:2000, positionClass:'toast-bottom-right', closeButton:true } );
        return;

        case 'delete':
          this._toastrService.error('La nota fue eliminada exitosamente', 'Nota Eliminada', { timeOut:2000, positionClass:'toast-bottom-right', closeButton:true } );
        return;
    }

  }

  getPremium(){
    Swal.fire({
        icon: 'warning',
        title: 'Consigue Premium',
        text: 'Has alcanzado el límite de notas creadas para tu nivel de cuenta, para crear más notas obtén tu cuenta premium, es muy accesible y nos ayuda a seguir online.'
      });
  }

}
