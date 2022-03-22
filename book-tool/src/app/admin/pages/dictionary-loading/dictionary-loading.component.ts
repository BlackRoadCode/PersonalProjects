import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

import { DictionaryService } from '../../services/dictionary.service';
import { LastName, Name } from 'src/app/private/interfaces/generated-name.interface';

@Component({
  selector: 'app-dictionary-loading',
  templateUrl: './dictionary-loading.component.html',
  styleUrls: ['./dictionary-loading.component.css']
})
export class DictionaryLoadingComponent implements OnInit {

  public ids = [];

  public namesForm: FormGroup = this._formBuilder.group({
    id:[0],
    name:[''],
    origin:[''],
    gender:[''],
    meaning:['']
  });

  public lastNamesForm: FormGroup = this._formBuilder.group({
    id:[0],
    lastname:[''],
    lnorigin:[''],
    lnmeaning:['']
  });

  public dictionaryForm: FormGroup = this._formBuilder.group({});

  public sinAntForm: FormGroup = this._formBuilder.group({});

  numMaleNames:string;
  numFemaleNames:string;
  numLastNames:string;

  constructor( 
    private _formBuilder:FormBuilder, 
    private _angularFirestore:AngularFirestore,
    private _dictionaryService: DictionaryService,
    private _toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this._dictionaryService.getMaleNames().subscribe( res => this.numMaleNames = res[0].id.toString() );
    this._dictionaryService.getFemaleNames().subscribe( res => this.numFemaleNames = res[0].id.toString() );
    this._dictionaryService.getLastNames().subscribe( res => this.numLastNames = res[0].id.toString() );
  }

  cancelRegister(form:string){
    switch (form) {
      case 'namesForm':
        this.namesForm.reset();
        break;
      
      case 'lastNamesForm':
        this.lastNamesForm.reset();
        break;
      
      case 'dictionaryForm':
        this.dictionaryForm.reset();
        break;
        
      case 'sinAntForm':
        this.sinAntForm.reset();
        break;
    
      default:
        break;
    }
  }

  saveName(){
    const data: Name = {
      id: Number(this.namesForm.get('id').value),
      name: this.namesForm.get('name').value,
      origin: this.namesForm.get('origin').value,
      gender: this.namesForm.get('gender').value,
      meaning: this.namesForm.get('meaning').value
    }

    if ( this.namesForm.get('gender').value === 'm' ) {
      this._dictionaryService.createMName(data).then(res => {
        this.cancelRegister('namesForm');
        this.showToast();
      });
    } else {
      this._dictionaryService.createFName(data).then(res => {
        this.cancelRegister('namesForm');
        this.showToast();
      });
    }
  }

  saveLastName(){
    const data: LastName = {
      id: Number(this.lastNamesForm.get('id').value),
      lastname: this.lastNamesForm.get('lastname').value,
      origin: this.lastNamesForm.get('lnorigin').value,
      meaning: this.lastNamesForm.get('lnmeaning').value
    }

    this._dictionaryService.createLastName(data).then(res => {
      this.cancelRegister('lastNamesForm');
      this.showToast();
    });
  }

  makeid(){
    let arrIds=[];
    for (let i = 0; i < 5; i++) { 
      let idDocument = this._angularFirestore.createId();
      arrIds.push(idDocument);
    }
    this.ids = arrIds; 
  }

  showToast( ) {
    this._toastrService.success('Registro añadido exitosamente', 'Registro Añadido', { timeOut:1000, positionClass:'toast-bottom-right', closeButton:true } );
    return;
  }

}
