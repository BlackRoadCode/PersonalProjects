import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import * as htmlDocx from 'html-docx-js/dist/html-docx'; import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

import { CharactersService } from 'src/app/private/services/characters.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Character } from 'src/app/private/interfaces/character.interface';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-secharacter',
  templateUrl: './secharacter.component.html',
  styleUrls: ['./secharacter.component.css']
})
export class SecharacterComponent implements OnInit {

  public exportCharacter:boolean = false;
  public user:User;
  public fileName:string = '';

  @ViewChild("quill-editor-content") divView: ElementRef;

  public userToken = localStorage.getItem('bp_tu');

  public character:Character = { 
    cid:'',
    physicalAspects:{},
    psychologicalAspects:{},
    socialAspects:{}
  };

  pdfConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'quill-editor-content',
    options: { 
      margin: 5
    }

  }

  constructor( 
    private _authService:AuthService, 
    private _activatedRoute:ActivatedRoute, 
    private _characterService:CharactersService, 
    private _exportAsService: ExportAsService,
    private _router:Router ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe( user => {
      this.user = user
      this._activatedRoute.params.subscribe( ({ idCharacter }) => {
        this.loadCharacter( user.uid, idCharacter );
      });
    });

    let finishDateFromData = this.userToken.substr(19,2) + '/' + this.userToken.substr(13,2) + '/20' + this.userToken.substr(25,2);
    let finishDate = new Date(finishDateFromData);
    let todayDate = new Date();

    let typeUser = this.userToken.substr(44, 3);

    if ( todayDate > finishDate ) {
      console.log(todayDate);
      console.log(finishDate);
      
      this.exportCharacter = false;
      return;
    }

    switch (typeUser) {
      // LEVEL_A
      case '132':
        this.exportCharacter = false;
        break;
      // LEVEL_B
      case '489':
        this.exportCharacter = true;
        break;
      // LEVEL_C
      case '273':
        this.exportCharacter = true;
        break;
      // LEVEL_D
      case '621':
        this.exportCharacter = true;
        break;
        // ADMIN
      case '142':
        this.exportCharacter = true;
        break;

      default:
        break;
    }

 }

 loadCharacter( userId: string, action:string ){
  this._characterService.getCharacter( userId, action ).subscribe( character => {
    this.character = character;
    this.fileName = this.character.physicalAspects.name;
  }, error => {
    return this._router.navigateByUrl('/private/dashboard/characters');
  });

}

exportAsPDF( name:string ) {
  this._exportAsService.save( this.pdfConfig, name ).pipe(  ).subscribe( res => { });
}

getPremium(){
  Swal.fire({
      icon: 'warning',
      title: 'No es posible exportar',
      text: 'Tu nivel de cuenta no cuenta con esta característica.'
    });
}

exportAsDOCX( name:string ) {
  let content = document.getElementById('quill-editor-content').innerHTML; 

  console.log('Esto trae content: ', content);
  

  let htmlDocument = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title>';
  htmlDocument = htmlDocument + '</head><body>' + content + '</body></html>';
  const converted = htmlDocx.asBlob(htmlDocument);
  saveAs(converted, name + '.docx');
}

}
