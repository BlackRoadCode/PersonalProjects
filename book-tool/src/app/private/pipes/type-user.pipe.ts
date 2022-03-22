import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeUser'
})
export class TypeUserPipe implements PipeTransform {

  transform( typeUser:string ):string {
    
    switch (typeUser) {
      case 'LEVEL_A': 
        return 'Free - Gratis';
        case 'LEVEL_B':
        return 'Bronze';
        case 'LEVEL_C':
        return 'Silver';
        case 'LEVEL_D':
        return 'Gold';
        default:
        return 'Free - Gratis';
    }
    
  }

}
