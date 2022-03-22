import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { User } from 'src/app/auth/interfaces/user.interface';
import { Work } from '../../interfaces/works.interface';

import { AuthService } from 'src/app/auth/services/auth.service';
import { WorksService } from '../../services/works.service';
import { Reloader } from '../../models/reloader.class';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  public user: User;
  public works: Work[];
  public lastWork: Work;
  public newFlag = false;
  public viewCard = true;
  public viewList = false;
  public numberWorksCreated: number;
  public reloader = new Reloader( this._router );

  public userToken = localStorage.getItem('bp_tu');

  /* User Items */
  public numWorks:number;
  public expWork:boolean;
  public delWork:boolean;
  public msgPremiumAccount:boolean = false;

  workForm: FormGroup = this._formBuilder.group({
    title: ['', [Validators.required, Validators.min(5)]],
    author: [''],
    briefIdea: ['']
  });

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _angularFirestore: AngularFirestore,
    private _worksService: WorksService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe(user => {
      this.user = user;
      this.setUserItems();
    });

    this.validateView();
  }

  validateView() {
    let view: string = localStorage.getItem('bp_ev');

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
      this.numWorks = 1;
      this.expWork = false;
      this.delWork = false;
      this.msgPremiumAccount = true;
      this.getNumberOfWorks(this.numWorks);
      return;
    } else {
      switch (typeUser) {
        // LEVEL_A
        case '132':
          this.numWorks = 1;
          this.expWork = false;
          this.delWork = false;
          break;
        // LEVEL_B
        case '489':
          this.numWorks = 2;
          this.expWork = true;
          this.delWork = true;
          break;
        // LEVEL_C
        case '273':
          this.numWorks = 5;
          this.expWork = true;
          this.delWork = true;
          break;
        // LEVEL_D
        case '621':
          this.numWorks = 20;
          this.expWork = true;
          this.delWork = true;
          break;
          // ADMIN
        case '142':
          this.numWorks = 100;
          this.expWork = true;
          this.delWork = true;
          break;
  
        default:
          break;
      }
      this.getWorks(this.numWorks);
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

  setEditorView(view: string) {

    if (view === 'c') {
      this.viewCard = true;
      this.viewList = false;
    } else {
      this.viewCard = false;
      this.viewList = true;
    }

    localStorage.setItem('bp_ev', view);
  }

  getWorks(numOfWorks:number) {
    this._worksService.getWorks(this.user.uid, numOfWorks).subscribe(works => {
      this.works = works;
      this.numberWorksCreated = works.length;
    });
  }

  getNumberOfWorks(numOfWorks:number){
    this._worksService.getNumberOfWorks(this.user.uid, numOfWorks).subscribe(works => {
      this.works = works;
      this.numberWorksCreated = works.length;
    });
  }

  saveWork() {
    if (this.workForm.valid) {

      const data: Work = {
        wid: this._angularFirestore.createId(),
        woid: this.numberWorksCreated,
        author: this.workForm.get('author').value,
        title: this.workForm.get('title').value,
        idea: this.workForm.get('briefIdea').value,
        bodyContent: '',
        creationDate: new Date().toDateString()
      }

      this._worksService.createWork(data, this.user).then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Registro guardado exitosamente',
          html: `El registro de tu obra <strong>${data.title}</strong> se guardó exitosamente.`
        });

      }).then( () => {

        let counter = Number(localStorage.getItem('bp_wi'));
        counter++;
        localStorage.setItem('bp_wi', counter.toString());

        this.reloader.reloadComponent();

        this.workForm.reset();
        this._router.navigate(['private', 'dashboard', 'editor']);
        this.newFlag = false;

      });
    }
  }

  getPremium(){
    Swal.fire({
        icon: 'warning',
        title: 'Consigue Premium',
        text: 'Has alcanzado el límite de obras creadas para tu nivel de cuenta, para crear más obras obtén tu cuenta premium, es muy accesible y nos ayuda a seguir online.'
      });
  }

  cancelNewWork() {
    this.workForm.reset();
    this.newFlag = false
  }

}
