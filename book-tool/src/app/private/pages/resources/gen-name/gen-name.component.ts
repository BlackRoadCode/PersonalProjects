import { Component, OnInit } from '@angular/core';

import { NameGeneratorService } from 'src/app/private/services/name-generator.service';
import { GeneratedName } from 'src/app/private/interfaces/generated-name.interface';
import { DictionaryService } from 'src/app/admin/services/dictionary.service';

@Component({
  selector: 'app-gen-name',
  templateUrl: './gen-name.component.html',
  styleUrls: ['./gen-name.component.css']
})
export class GenNameComponent implements OnInit {

  public gender: string = '';
  public generate = false;

  public numMaleNames:number = 0;
  public numFemaleNames:number = 0;
  public numLastNames:number = 0;
  
  public generatedName: GeneratedName = {
    name:{
      name:'',
      origin:'',
      gender:'',
      meaning:''
    },
    lastName:{
      lastname:'',
      origin:'',
      meaning: ''
    }
  };

  constructor( private _nameGeneratorService: NameGeneratorService, private _dictionaryService:DictionaryService) { 
    this._dictionaryService.getMaleNames().subscribe( res => {
      this.numMaleNames = res[0].id;
    } );
    
    this._dictionaryService.getFemaleNames().subscribe( res => {
      this.numFemaleNames = res[0].id;
    } );
    
    this._dictionaryService.getLastNames().subscribe( res => {
      this.numLastNames = res[0].id;
    } );
  }

  ngOnInit(): void { }

  generateRandomName() {

    this.generate = true;
    var idMName = Math.floor((Math.random() * this.numMaleNames) + 1);
    var idFName = Math.floor((Math.random() * this.numFemaleNames) + 1);
    var idLastName = Math.floor((Math.random() * this.numLastNames) + 1);    

    if (this.gender === 'm') {

      this._nameGeneratorService.getMaleName(idMName).subscribe(name => {
        this.generatedName.name = name[0];
      });

    } else {

      this._nameGeneratorService.getFemaleName(idFName).subscribe(name => {
        this.generatedName.name = name[0];
      });

    }

    this._nameGeneratorService.getLastName(idLastName).subscribe( lastName =>{
      this.generatedName.lastName = lastName[0];
    });

  }


}
