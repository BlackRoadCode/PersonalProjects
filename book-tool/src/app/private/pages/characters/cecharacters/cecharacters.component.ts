import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { delay, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { CharactersService } from 'src/app/private/services/characters.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Character } from 'src/app/private/interfaces/character.interface';
import { FileItem } from 'src/app/private/models/file-item';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-cecharacters',
  templateUrl: './cecharacters.component.html',
  styleUrls: ['./cecharacters.component.css']
})
export class CecharactersComponent implements OnInit {

  public user: User;
  public characters: Character[] = [];
  public character: Character;
  public characterImage: string = '';
  public characterName: string = '';
  public files: FileItem[] = [];
  public isOverDrop = false;
  public isDropped = false;
  public action = '';

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  profileUrl: Observable<string | null>;

  charactersForm: FormGroup = this._formBuilder.group({
    physicalAspects: this._formBuilder.group({
      name: ['', Validators.required],
      briefDescription: [''],
      age: [''],
      height: [''],
      weight: [''],
      eyeColor: [''],
      race: [''],
      hairColor: [''],
      gender: [''],
      bodyBuild: [''],
      skinColor: [''],
      faceDetails: [''],
      voiceIntensity: [''],
      whistleVoice: [''],
      voiceTone: [''],
      health: [''],
      characteristicDetails: [''],
      extraNotes: ['']
    }),
    psychologicalAspects: this._formBuilder.group({
      psychopathicDisorders: [''],
      sexLife: [''],
      moralEthicalStandards: [''],
      ambitions: [''],
      temperament: [''],
      character: [''],
      attitudeLife: [''],
      complexesInhibitions: [''],
      disappointments: [''],
      intellectualQualitiesDifficulties: ['']
    }),
    socialAspects: this._formBuilder.group({
      nationality: [''],
      religion: [''],
      socialStratum: [''],
      civilStatus: [''],
      sociability: [''],
      job: [''],
      education: [''],
      familyLife: [''],
      politicalIdeas: [''],
      economicStatus: [''],
      sportsHobbies: [''],
      home: [''],
      hobbies: [''],
      travels: ['']
    })
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _characterService: CharactersService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _angularFirestore: AngularFirestore,
    private _angularFireStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {

    this._authService.user$.subscribe(user => {

      // Determinando el usuario actual
      this.user = user;

      // Obtener el caracter actual, si el parámetro action = new creación de nuevo personaje, si es != new editar uno existente
      this._activatedRoute.params.subscribe(({ action }) => {
        this.action = action;
        this.loadCharacter(user.uid, action);
      });

    });
  }

  get physicalAspects() {
    return this.charactersForm.get('physicalAspects') as FormGroup;
  }

  get psychologicalAspects() {
    return this.charactersForm.get('psychologicalAspects') as FormGroup;
  }

  get socialAspects() {
    return this.charactersForm.get('socialAspects') as FormGroup;
  }

  saveCharacter(  ) {
    if (this.files.length > 0) {

      let characterID = this._angularFirestore.createId();
      const file = this.files[0].file;
      const filePath = this.user.uid + '/characters/' + characterID;
      const fileRef = this._angularFireStorage.ref(filePath);
      const task = this._angularFireStorage.upload(filePath, file);

      this.uploadPercent = task.percentageChanges();

      task.snapshotChanges().pipe( delay(250),
        finalize( () => this.downloadURL = fileRef.getDownloadURL())
      ).subscribe( () => {
        const ref = this._angularFireStorage.ref(this.user.uid + '/characters/' + characterID);
        this.profileUrl = ref.getDownloadURL();

        this.profileUrl.subscribe( res => {

          const data: Character = {
            cid: characterID,
            characterImage: res,
            physicalAspects: this.physicalAspects.value,
            psychologicalAspects: this.psychologicalAspects.value,
            socialAspects: this.socialAspects.value
          }

          this._characterService.createCharacter(data, this.user).then( () => {

            Swal.fire({
              icon: 'success',
              title: 'Registro guardado',
              text: 'El personaje ha sido guardado exitosamente'
            }).then( ()=> {
              let counter = Number(localStorage.getItem('bp_ca'));
              counter++;
              localStorage.setItem('bp_ca', counter.toString());
    
            }).finally( () =>{
                this.reloadComponent();
              });

          }).catch(error => {
            Swal.fire({
              title: 'Error al guardar el registro',
              icon: 'error',
              text: 'Hubo un error al guardar el registro'
            });
          });

        });
      });



    } else {

      const data: Character = {
        cid: this._angularFirestore.createId(),
        characterImage: '',
        physicalAspects: this.physicalAspects.value,
        psychologicalAspects: this.psychologicalAspects.value,
        socialAspects: this.socialAspects.value
      }

      this._characterService.createCharacter(data, this.user).then( res => {

        Swal.fire({
          icon: 'success',
          title: 'Registro guardado',
          text: 'El personaje ha sido guardado exitosamente'
        }).then( ()=> {
          let counter = Number(localStorage.getItem('bp_ca'));
          counter++;
          localStorage.setItem('bp_ca', counter.toString());

        }).finally( () => {
            this.reloadComponent();
          });

      }).catch(error => {
        Swal.fire({
          title: 'Error al guardar el registro',
          icon: 'error',
          text: 'Hubo un error al guardar el registro'
        });
      });

    }

  }

  editCharacter(){
    if ( this.files.length > 0 ) {
      const file = this.files[0].file;
      const filePath = this.user.uid + '/characters/' + this.character.cid;
      const fileRef = this._angularFireStorage.ref(filePath);
      const task = this._angularFireStorage.upload(filePath, file);

      this.uploadPercent = task.percentageChanges();

      task.snapshotChanges().pipe(delay(150),
        finalize(() => this.downloadURL = fileRef.getDownloadURL())
      ).subscribe( res => {
        const ref = this._angularFireStorage.ref(this.user.uid + '/characters/' + this.character.cid);
        this.profileUrl = ref.getDownloadURL();

        this.profileUrl.subscribe(res => {

          const data = {
            cid: this.character.cid,
            characterImage: res,
            physicalAspects: this.physicalAspects.value,
            psychologicalAspects: this.psychologicalAspects.value,
            socialAspects: this.socialAspects.value
          };

          this._characterService.updateCharacter(data, this.user);

          Swal.fire({
            title: 'Personaje Actualizado',
            html: `El personaje fue actualizado con éxito.`,
            icon: 'success',
            confirmButtonText: 'OK'
          });

          this._router.navigate(['/private', 'dashboard', 'characters']);

          return;
        });

      });

    } else {

      if ( this.character ) {
        const data = {
          cid: this.character.cid,
          characterImage: this.character.characterImage,
          physicalAspects: this.physicalAspects.value,
          psychologicalAspects: this.psychologicalAspects.value,
          socialAspects: this.socialAspects.value
        };

        this._characterService.updateCharacter(data, this.user);

        Swal.fire({
          title: 'Personaje Actualizado',
          html: `El personaje fue actualizado con éxito.`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then( () => {
          this._router.navigate(['/private', 'dashboard', 'characters']);
          return;
        });

      }
  }
}

  reloadComponent() {
    let currentUrl = this._router.url;
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate([currentUrl]);

        this._router.navigateByUrl('private/dashboard/characters');
    }

  loadCharacter(userId: string, action: string) {

    if (action === 'new') { return; }

    this._characterService.getCharacter(userId, action).pipe(delay(150)).subscribe(character => {

      this.character = character;
      this.characterName = character.physicalAspects.name;
      this.characterImage = character.characterImage;

      this.charactersForm.setValue({
        physicalAspects: character.physicalAspects,
        psychologicalAspects: character.psychologicalAspects,
        socialAspects: character.socialAspects
      });

    }, error => {
      return this._router.navigateByUrl('/private/dashboard/characters');
    });

  }


}
