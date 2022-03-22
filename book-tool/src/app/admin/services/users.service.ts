import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public userItems:string = '';

  constructor() { }

  generateUserTU( user:User ):string{
    let tokenUser = 
    this.generateAleat(2, 6) + '-' + 
    this.generateAleat(2, 6) + 
    this.convertDate(user.endDate) + 
    this.convertDate(user.startDate) + 
    this.generateAleat(2,3) + 
    this.convertUserAccount(user.accountType) + 
    this.generateAleat(2,6) + 
    this.convertDate(user.startDate) + 
    this.generateAleat(2,6) +
    this.generateAleat(2,6) +
    this.convertDate(user.endDate) +
    this.generateAleat(2, 6) + 
    this.generateUserItems(user.accountType) + 
    this.generateAleat(2, 6) +
    this.generateAleat(2, 6) + '-' + 
    this.generateAleat(2, 6);

    // console.log(tokenUser);

    return tokenUser;
  }

  generateAleat(start:number, end:number){
    return Math.random().toString(36).substr(start, end);
  }

  convertDate( date:string ){
    let dateSplit = date.split('/');
    let dateConv = dateSplit.join(this.generateAleat(2,4));
    return dateConv;
  }

  convertUserAccount( accountType:string ){
    switch (accountType) {
      case 'LEVEL_A':
        return '132';
      case 'LEVEL_B':
        return '489';
      case 'LEVEL_C':
        return '273'
      case 'LEVEL_D':
        return '621';
      default:
        return '142';
    }
  }

  generateUserItems( typeUser:string ){
    switch (typeUser) {
      case 'LEVEL_A':
        this.userItems = 'uhzyhfuxxxxx';
        return this.userItems;
      case 'LEVEL_B':
        this.userItems = 'tsiyfihxxxyy';
        return this.userItems;
      case 'LEVEL_C':
        this.userItems = 'feoyzozxyyyy';
        return this.userItems;
      case 'LEVEL_D':
        this.userItems = 'wnnynnnyyyyy';
        return this.userItems;    
      default:
        this.userItems = 'uhzyhfuxxxxx';
        return this.userItems;
    }
  }

}
