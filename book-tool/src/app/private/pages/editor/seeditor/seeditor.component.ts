import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { WorksService } from 'src/app/private/services/works.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Work } from 'src/app/private/interfaces/works.interface';
import * as htmlDocx from 'html-docx-js/dist/html-docx'; import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seeditor',
  templateUrl: './seeditor.component.html',
  styleUrls: ['./seeditor.component.css']
})

export class SeeditorComponent implements OnInit {

  public user:User;
  public idWork:string;
  public fileName = '';
  public exportPlay = false;
  public userToken = localStorage.getItem('nm_tu');
  public work:Work = {
    wid:'',
    author:'',
    title:''
  };

  pdfConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'quill-editor-content', 
  }

  constructor(
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _worksService: WorksService,
    private _exportAsService: ExportAsService
  ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe( user => {
      this.user = user;
      this._activatedRoute.params.subscribe( ({ id }) => {
        this.user = user;
        this.loadWork( user.uid, id );
        this.idWork = id;

        this.setUserItems()
      });
    });
  }

  setUserItems(){
    let typeUser = this.userToken.substr(44, 3);

    switch (typeUser) {
      // LEVEL_A
      case '132':
        this.exportPlay = false;
        break;
      // LEVEL_B
      case '489':
        this.exportPlay = false;
        break;
      // LEVEL_C
      case '273':
        this.exportPlay = true;
        break;
      // LEVEL_D
      case '621':
        this.exportPlay = true;
        break;
        // ADMIN
      case '142':
        this.exportPlay = true;
        break;

      default:
        break;
    }
  }

  loadWork( userId: string, workId:string ){
    this._worksService.getWork(userId, workId).subscribe( work => {
      this.work = work;
      this.fileName = this.work.author + '-' + this.work.title;
    });
  }

  getPremium(){
    Swal.fire({
        icon: 'warning',
        title: 'No es posible exportar',
        text: 'Tu nivel de cuenta no cuenta con esta característica.'
      });
  }

  exportAsPDF( name:string ) {
    // this._exportAsService.save( this.pdfConfig, name ).pipe( delay(500) ).subscribe( res => {
    this._exportAsService.save( this.pdfConfig, name ).pipe(  ).subscribe( res => {
      console.log( res );
    });
  }
  
  exportAsDOCX( name:string ) {
    let bookTitle = '<center><h2 class="my-5">' + this.work.title + '</h2></center>';
    let bookAuthor = '<center><h4 class="my-3">' + this.work.author + '</h4></center>';
    let htmlDocument = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title>';
    htmlDocument = htmlDocument + '</head><body>' + '<br>' + bookTitle + '<br>' + bookAuthor + this.work.bodyContent + '</body></html>';
    const converted = htmlDocx.asBlob(htmlDocument);
    saveAs(converted, name + '.docx');
  }



}
