import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Inspiration } from '../../interfaces/inspiration.interface';
import { InspirationsService } from '../../services/inspirations.service';
import { ToastrService } from 'ngx-toastr';
import { FileItem } from '../../models/file-item';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { delay, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Reloader } from '../../models/reloader.class';

@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  styleUrls: [ './inspiration.component.css' ]
})
export class InspirationComponent implements OnInit {

  public user: User;
  public numberInspirations: number;
  public inspirations: Inspiration[];
  public inspiration: Inspiration;
  public newTextFlag = false;
  public newImageFlag = false;
  public editFlag = false;
  public viewCard = true;
  public viewList = false;
  public reloader = new Reloader( this._router );

  public numberInspirationsCreated: number;
  public userToken = localStorage.getItem('bp_tu');

  /* User Items */
  public numInspirations: number;
  public msgPremiumAccount:boolean = false;

  public files: FileItem[] = [];
  public isOverDrop = false;
  public isDropped = false;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  profileUrl: Observable<string | null>;

  public inspirationForm: FormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    inspirationDetails: ['']
  });
  
  public inspirationImageForm: FormGroup = this._formBuilder.group({
    imageText:['']
  });

  constructor(
    private _authService: AuthService,
    private _inspirationsService: InspirationsService,
    private _formBuilder: FormBuilder,
    private _angularFirestore: AngularFirestore,
    private _toastrService: ToastrService,
    private _angularFireStorage: AngularFireStorage,
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
    let view: string = localStorage.getItem('bp_iv');

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
      this.numberInspirations = 10;
      this.msgPremiumAccount = true;
      this.getNumberOfInspirations(this.numberInspirations);
      return;
    } else {
      switch (typeUser) {
        // LEVEL_A
        case '132':
          this.numberInspirations = 10;
          break;
        // LEVEL_B
        case '489':
          this.numberInspirations = 30;
          break;
        // LEVEL_C
        case '273':
          this.numberInspirations = 100;
          break;
        // LEVEL_D
        case '621':
          this.numberInspirations = 999;
          break;
          // ADMIN
        case '142':
          this.numberInspirations = 999;
          break;
  
        default:
          console.log('Este usuario no tiene user token, revisar', this.userToken);
          break;
      }
      this.getNumberOfInspirations(this.numberInspirations);
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

  setInspirationView(view: string) {

    if (view === 'c') {
      this.viewCard = true;
      this.viewList = false;
    } else {
      this.viewCard = false;
      this.viewList = true;
    }

    localStorage.setItem('bp_iv', view);
  }

  saveInspiration( ) {

    if (this.inspirationForm.valid) {

      const data: Inspiration = {
        iid: this._angularFirestore.createId(),
        title: this.inspirationForm.get('title').value,
        text: this.inspirationForm.get('inspirationDetails').value,
        inspirationImage: '',
        type:'text',
        creationDate: new Date().toDateString()
      }

      this._inspirationsService.createInspiration(data, this.user).then(res => {
        this.showToast('add');

        let counter = Number(localStorage.getItem('bp_in'));
        counter++;
        localStorage.setItem('bp_in', counter.toString());

        this.reloader.reloadComponent();

        this.inspirationForm.reset();
        this.newTextFlag = false;
        this.newImageFlag = false;
      });
    }
  }

  saveImageInspiration(){

    if (this.files.length > 0) {
      const inspirationId = this._angularFirestore.createId();
      const file = this.files[0].file;
      const filePath = this.user.uid + '/inspirations/' + inspirationId;
      const fileRef = this._angularFireStorage.ref(filePath);
      const task = this._angularFireStorage.upload(filePath, file);

      this.uploadPercent = task.percentageChanges();

      task.snapshotChanges().pipe( delay(150),
        finalize(() => this.downloadURL = fileRef.getDownloadURL())
      ).subscribe( res => {
        const ref = this._angularFireStorage.ref(this.user.uid + '/inspirations/' + inspirationId);
        this.profileUrl = ref.getDownloadURL();

        this.profileUrl.subscribe(res => {
        
      const data = {
          iid: inspirationId,
          title: this.files[0].name,
          text: this.inspirationImageForm.get('imageText').value,
          inspirationImage: res,
          creationDate: new Date().toDateString(),
          type:'image'
        }

      this._inspirationsService.createInspiration(data, this.user).then( () => {
        this.inspirationImageForm.reset();
        this.files = [];
        this.isDropped = false;
        this.newTextFlag = false;
        this.newImageFlag = false;

      }).finally( () => {
        let counter = Number(localStorage.getItem('bp_in'));
        counter++;
        localStorage.setItem('bp_in', counter.toString());

        this.showToast('add');
        this.reloader.reloadComponent();
      });

          // this._router.navigate(['/private', 'dashboard', 'inspiration']);

          return;
        });

      });

    }

  }

  loadInspiration(inspiration: Inspiration) {

    this.inspiration = inspiration;
    this.editFlag = true;

    if ( inspiration.type === 'text' ){
      this.newTextFlag = true;
      this.inspirationForm.setValue({
        title: inspiration.title,
        inspirationDetails: inspiration.text
      });
    } else {
      this.newImageFlag = true;
      this.inspirationImageForm.setValue({
        imageText: inspiration.text
      });
    }

  }

  getInspirations(userid: string) {
    this._inspirationsService.getInspirations(userid).subscribe(inspirations => {
      this.numberInspirations = inspirations.length;
      return this.inspirations = inspirations;
    });
  }

  getNumberOfInspirations(numOfNotes:number){
    this._inspirationsService.getNumberOfInspirations(this.user.uid, numOfNotes).subscribe(inspirations => {
      this.inspirations = inspirations;
      this.numberInspirationsCreated = this.inspirations.length;
    });
  }

  editInspiration(inspiration: Inspiration) {
    const dataEdit: Inspiration = {
      iid: inspiration.iid,
      title: this.inspirationForm.get('title').value,
      text: this.inspirationForm.get('inspirationDetails').value
    }

    this._inspirationsService.updateInspiration(dataEdit, this.user);

    this.showToast('edit');

    this._router.navigate(['/private', 'dashboard', 'inspiration']).then( () => {
      this.cancelNewInspiration();
    });

  }

  editInspirationImage(inspiration: Inspiration){

    if ( this.files.length != 0  ){

      const file = this.files[0].file;
      const filePath = this.user.uid + '/inspirations/' + inspiration.iid;
      const fileRef = this._angularFireStorage.ref(filePath);
      const task = this._angularFireStorage.upload(filePath, file);
  
        this.uploadPercent = task.percentageChanges();
  
        task.snapshotChanges().pipe( delay(150),
          finalize( () => this.downloadURL = fileRef.getDownloadURL())
        ).subscribe( () => {
          const ref = this._angularFireStorage.ref(this.user.uid + '/inspirations/' + inspiration.iid);
          this.profileUrl = ref.getDownloadURL();
  
          this.profileUrl.subscribe(res => { 

            const dataEdit: Inspiration = {
              iid: inspiration.iid,
              text: this.inspirationImageForm.get('imageText').value,
              inspirationImage:res
            }
            
            this._inspirationsService.updateInspiration(dataEdit, this.user);
            return;
          });
          
        });
        
        this.showToast('edit');
        this._router.navigate(['/private', 'dashboard', 'inspiration']);
        this.cancelNewInspiration();
        return;
        
    } else {
      const dataEdit: Inspiration = {
        iid: inspiration.iid,
        title: inspiration.title,
        text: this.inspirationImageForm.get('imageText').value,
      }
      
      this._inspirationsService.updateInspiration(dataEdit, this.user);
      
      this.showToast('edit');
      this._router.navigate(['/private', 'dashboard', 'inspiration']);
      this.cancelNewInspiration();
      
      return;
    }

    
  }

  deleteInspiration(inspiration: Inspiration) {

    if( inspiration.type === 'text' ){
      Swal.fire({
        title: '¿Borrar Inspiración?',
        html: 'Está a punto de borrar esta inspiración',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#58A4B0',
        cancelButtonColor: '#FF332E',
        confirmButtonText: 'Confirmar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.value) {
  
          this._inspirationsService.deleteInspirations(this.user.uid, inspiration.iid).then( () => {

          }).finally( () => {
            let counter = Number(localStorage.getItem('bp_in'));
            counter--;
            localStorage.setItem('bp_in', counter.toString());
  
            this.reloader.reloadComponent();
            
            this.showToast('delete');
            this.getInspirations(this.user.uid);
          });
  
        }
      })
    } else if ( inspiration.type === 'image' ) {
      Swal.fire({
        title: '¿Borrar Inspiración?',
        html: 'Está a punto de borrar esta inspiración',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#58A4B0',
        cancelButtonColor: '#FF332E',
        confirmButtonText: 'Confirmar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.value) {
  
          /* Delete the image resource from firebase */
          const ref = this._angularFireStorage.ref(this.user.uid + '/inspirations/' + inspiration.iid);
          ref.delete();

          this._inspirationsService.deleteInspirations(this.user.uid, inspiration.iid).then( () => {

          }).finally( () => {
            let counter = Number(localStorage.getItem('bp_in'));
            counter--;
            localStorage.setItem('bp_in', counter.toString());

            this.reloader.reloadComponent();
            this.showToast('delete');
            this.getInspirations(this.user.uid);
          });
  
        }
      })
    }

  }

  cancelNewInspiration() {
    this.inspirationForm.reset();
    this.files = [];
    this.editFlag = false;
    this.isDropped = false;
    this.newTextFlag = false;
    this.newImageFlag = false;
    this.inspiration = { iid: '' };
  }

  resetForm(){
    this.inspirationImageForm.reset();
  }

  showToast(typeToast: string) {

    switch (typeToast) {
      case 'add':
        this._toastrService.success('La inspiración fue creada exitosamente.', 'Inspiración Creada', { timeOut: 2000, positionClass: 'toast-bottom-right', closeButton: true });
        return;

      case 'edit':
        this._toastrService.info('La inspiración fue actualizada exitosamente.', 'Inspiración Actualizada', { timeOut: 2000, positionClass: 'toast-bottom-right', closeButton: true });
        return;
      case 'delete':
        this._toastrService.error('La inspiración fue eliminada exitosamente.', 'Inspiración Eliminada', { timeOut: 2000, positionClass: 'toast-bottom-right', closeButton: true });
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
