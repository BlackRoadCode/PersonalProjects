import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import Swal from 'sweetalert2';

import { CharactersService } from '../../services/characters.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Character } from '../../interfaces/character.interface';
import { Reloader } from '../../models/reloader.class';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styles: [
  ]
})
export class CharactersComponent implements OnInit {

  public ut:string;
  public user: User;
  public characters: Character[];
  public numberCharactersCreated:number;
  public viewCard = false;
  public viewList = true;
  public reloader = new Reloader( this._router );

  public userToken = localStorage.getItem('bp_tu');

  /* User Items */
  public numCharacters: number;
  public exportCharacter:boolean;
  public msgPremiumAccount:boolean = false;

  constructor(
    private _authService: AuthService, 
    private _characterService: CharactersService, 
    private _router:Router,
    private _angularFireStorage:AngularFireStorage
    ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe(user => {
      this.user = user;
      this.setUserItems();
    });

    this.validateView();
  }

  private setUserItems() {
    let finishDateFromData = this.userToken.substr(19,2) + '/' + this.userToken.substr(13,2) + '/20' + this.userToken.substr(25,2);
    let finishDate = new Date(finishDateFromData);
    let todayDate = new Date();
    let typeUser = this.userToken.substr(44, 3);

    if ( todayDate > finishDate ) {
      this.numCharacters = 3;
      this.exportCharacter = false;
      this.msgPremiumAccount = true;
      this.getNumberOfCharacters( this.numCharacters );
      return;
    } else {
      switch (typeUser) {
        // LEVEL_A
        case '132':
          this.numCharacters = 3;
          break;
        // LEVEL_B
        case '489':
          this.numCharacters = 6;
          break;
        // LEVEL_C
        case '273':
          this.numCharacters = 20;
          break;
        // LEVEL_D
        case '621':
          this.numCharacters = 999;
          break;
          // ADMIN
        case '142':
          this.numCharacters = 999;
          break;
  
        default:
          break;
      }
      this.getNumberOfCharacters( this.numCharacters );
    }

  }

  formatStartDate( date ){
    date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear().toString();

    month = (month + 1).toString();

    if ( month.length === 1 ){ month = "0" + month; }
    if ( day.length === 1 ){ day = "0" + day; }

    return month + '/' + day + '/' + year;
  }

  validateView() {
    let view: string = localStorage.getItem('bp_cv');

    if (view === 'c') {
      this.viewCard = true;
      this.viewList = false;
    } else {
      this.viewCard = false;
      this.viewList = true;
    }
  }
 
  setCharacterView(view: string) {
    if (view === 'c') {
      this.viewCard = true;
      this.viewList = false;
    } else {
      this.viewCard = false;
      this.viewList = true;
    }

    localStorage.setItem('bp_cv', view);
  }

  getCharacters() {
    this._characterService.getCharacters(this.user.uid).subscribe(characters => {
      this.numberCharactersCreated = characters.length;
      return this.characters = characters;
    });

  }

  getNumberOfCharacters(numOfCharacters:number){
    this._characterService.getNumberOfCharacters(this.user.uid, numOfCharacters).subscribe( characters => {      
      this.characters = characters;
      this.numberCharactersCreated = characters.length;
    });
  }

  deleteCharacter(character: Character) {
    Swal.fire({
      title: '¿Borrar personaje?',
      html: `Está a punto de borrar el personaje: <b>${character.physicalAspects.name}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#58A4B0', 
      confirmButtonText: 'Confirmar',
      cancelButtonColor: '#FF332E',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if ( result.value ) {

        if( character.characterImage !== '' ){

          // Delete image from storage
          const ref = this._angularFireStorage.ref(this.user.uid + '/characters/' + character.cid);
          ref.delete();

          let counter = Number(localStorage.getItem('bp_ca'));
          counter--;
          localStorage.setItem('bp_ca', counter.toString());
  
          this._characterService.deleteCharacter(this.user.uid, character.cid).then( () => {  
            this.reloader.reloadComponent();
          });
          Swal.fire(
            'Borrado!',
            'El registro ha sido borrado.',
            'success'
          );
  
          this.getCharacters();
        }
        

      }
    })
  }

  getPremium(){
    Swal.fire({
        icon: 'warning',
        title: 'Consigue Premium',
        text: 'Has alcanzado el límite de personajes creados para tu nivel de cuenta, para crear más personajes obtén tu cuenta premium, es muy accesible y nos ayuda a seguir online.'
      });
  }

}
