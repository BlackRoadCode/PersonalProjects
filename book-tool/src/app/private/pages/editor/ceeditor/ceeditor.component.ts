import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorksService } from 'src/app/private/services/works.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Work } from 'src/app/private/interfaces/works.interface';
import Swal from 'sweetalert2';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-ceeditor',
  templateUrl: './ceeditor.component.html',
  styleUrls: ['./ceeditor.component.css']
})
export class CeeditorComponent implements OnInit {

  public editorModel = [{
    attributes: {
      font: 'roboto'
    },
    insert: ''
  }]

  public fileName = '';
  public idWork = '';
  public loader = true;
  public user:User;
  public viewCounter = true;
  public exportPlay = false;
  public workArray = [];
  public work:Work = {
    wid:'',
    author:'',
    title:''
  };

  constructor( 
    private _authService:AuthService, 
    private _activatedRoute:ActivatedRoute,
    private _worksService:WorksService 
    ) { }

  ngOnInit(): void {

    this._authService.user$.subscribe( user => {
      this.user = user;
      this._activatedRoute.params.subscribe( ({ id }) => {
        this.user = user;
        this.loadWork( user.uid, id );
        this.loader = false;
        this.idWork = id;
      });
    });

    // TODO: Observable que guarde cada X tiempo

  }

  loadWork( userId: string, workId:string ){
    this._worksService.getWork(userId, workId).subscribe( work => {
      this.work = work;
      this.fileName = this.work.author + '-' + this.work.title;
      this.editorModel['insert'] = this.work.bodyContent;
    });
  }

  saveWork(){
      const data = { 
        wid:this.work.wid,
        author:this.work.author,
        title:this.work.title,
        bodyContent:this.work.bodyContent,
      };

      this._worksService.updateWork( this.user.uid, data ).then( res => {
        Swal.fire({
          title: 'Obra Actualizado',
          html: `Esto se va a cambiar por un toast para no hacerlo tan invasivo.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      });

      return;
  }

}
