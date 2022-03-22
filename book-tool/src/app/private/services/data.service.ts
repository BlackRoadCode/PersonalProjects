import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public columnsFlag:boolean = false;
  public columnSidebar:string = 'col-md-2';
  public columnContent:string = 'col-md-10 col-sm-12';

  constructor( ) { }

  toggleColumns( ){
    if( this.columnsFlag ) {
      this.columnSidebar = 'col-md-2 animate__animated animate__slideInLeft';
      this.columnContent = 'col-md-9 col-sm-12';
      this.columnsFlag = !this.columnsFlag;
    } else {
      this.columnSidebar = 'd-none animate__animated animate__slideOutLeft';
      this.columnContent = 'col-md-10 offset-md-1 col-sm-12';
      this.columnsFlag = !this.columnsFlag;
    }
  }

}
