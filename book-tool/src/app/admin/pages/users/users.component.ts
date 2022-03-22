import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/auth/interfaces/user.interface';
import { AdminService } from '../../services/admin.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users:User[] = [];
  public veditUser = false;

  formUser: FormGroup = this._formBuilder.group({
    accountType:['', Validators.required],
    startDate:['', Validators.required],
    endDate:['', Validators.required]
  });

  constructor( private _adminService:AdminService, private _formBuilder:FormBuilder, private _usersService:UsersService ) { }

  ngOnInit(): void {
    this._adminService.getUsers().subscribe( users => {
      this.users = users;
    });
  }

  editUser(user:User){
    user.editUser = !user.editUser;

    this.formUser.setValue({
      accountType:user.accountType || '',
      startDate:user.startDate || '',
      endDate:user.endDate || ''
    });
  }

  updateUser( user:User ){

    if( this.formUser.valid ){

      const data:User = { ...user,
        accountType:this.formUser.get('accountType').value,
        startDate:this.formUser.get('startDate').value,
        endDate:this.formUser.get('endDate').value,
        editUser:false
      };
      
      this._adminService.updateUser(data, user);
    }

  }

  setUserToken( user:User ) {
    if ( user.startDate !== undefined && user.endDate !== undefined ) {
      const data:User = { ...user,
         userTU:this._usersService.generateUserTU(user),
        editUser:false
      };
      
      this._adminService.updateUser(data, user);
    }
  }

  deleteUser( userID:string ){

    Swal.fire({
      title: '¿Borrar usuario?',
      html: `Estás completamente seguro de que deseas borrar al usuario?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {

        this._adminService.deleteUser( userID ).then( ()=> {
          Swal.fire(
            'Borrado!',
            'El registro ha sido borrado.',
            'success'
            );
        });

      }
    })

  }

}
