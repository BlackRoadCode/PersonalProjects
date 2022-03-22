import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  photoUser:string;

  constructor( ){}

  transform( imgUser:string ):string {

    if( imgUser ){
      return imgUser;
    } else {
      return this.photoUser = '../../../../assets/img/generals/no-avatar.png';
    }

  }

}