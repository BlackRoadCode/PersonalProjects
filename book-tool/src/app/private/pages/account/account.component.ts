import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { FileItem } from '../../models/file-item';
import { User } from 'src/app/auth/interfaces/user.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public editUser = false;

  public files: FileItem[] = [];
  public isOverDrop = false;
  public isDropped = false;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  profileUrl: Observable<string | null>;

  myAccountForm: FormGroup = this._formBuilder.group({
    displayName: [''],
  });

  public user: User = {
    uid:'',
    email:'',
    emailVerified:false,
    photoURL:''
  };

  constructor( 
    private _authService:AuthService, 
    private _formBuilder:FormBuilder,
    private _angularFireStorage: AngularFireStorage,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  updateAccount(){
    this._authService.createUserRecord(this.user)
  }

  fillForm(){
    this.editUser = !this.editUser;

    this.myAccountForm.setValue({
      displayName:this.user.displayName
    });
  }

  updateUser(){

    if (this.files.length > 0){
      const file = this.files[0].file;
      const filePath = this.user.uid + '/users/' + this.user.uid;
      const fileRef = this._angularFireStorage.ref(filePath);
      const task = this._angularFireStorage.upload(filePath, file);
  
        this.uploadPercent = task.percentageChanges();
  
        task.snapshotChanges().pipe(delay(150),
          finalize(() => this.downloadURL = fileRef.getDownloadURL())
        ).subscribe(res => {
          const ref = this._angularFireStorage.ref(this.user.uid + '/users/' + this.user.uid);
          this.profileUrl = ref.getDownloadURL();
  
          this.profileUrl.subscribe( res => {
  
            const data = {
              ...this.user,
              photoURL: res,
              displayName:this.myAccountForm.value['displayName']
            };
  
            this._authService.updateUserRecord(data);
  
            Swal.fire({
              title: 'Perfil actualizado',
              html: `Tu perfil ha sido actualizado.`,
              icon: 'success',
              confirmButtonText: 'OK'
            });
  
            this.editUser = false;
            this.isDropped = false;
            this.files = [];
            this._router.navigate(['/private', 'dashboard', 'account']);
  
            return;
          });
  
  
        });
    } else {
      const data = {
        ...this.user,
        displayName:this.myAccountForm.value['displayName']
      };

      this._authService.updateUserRecord(data);

      Swal.fire({
        title: 'Perfil actualizado',
        html: `Tu perfil ha sido actualizado.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });

      this.editUser = false;
      this.isDropped = false;
      this.files = [];
      this._router.navigate(['/private', 'dashboard', 'account']);

      return;
    }
    
  }

  cancelEdit(){    
    this.editUser = false;
    this.isDropped = false;
    this.files = [];
  }

}
