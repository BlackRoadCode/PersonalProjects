import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-subnavbar',
  templateUrl: './subnavbar.component.html',
  styleUrls: ['./subnavbar.component.css']
})
export class SubnavbarComponent implements OnInit {

  columnsFlag = false;
  buttonClass:string = 'd-none d-sm-block col-md-2 col-lg-2 text-end animate__animated animate__slideInLeft';

  constructor( private _dataService:DataService ) { }

  ngOnInit(  ): void { }

  toggleColumns(){
    this._dataService.toggleColumns();

    if( this.columnsFlag ) {
      this.buttonClass = 'd-none d-sm-block col-md-2 col-lg-2 text-end animate__animated animate__slideInLeft';
      this.columnsFlag = !this.columnsFlag;
    } else {
      this.buttonClass = 'd-none d-sm-block col-md-1 col-lg-1 text-end animate__animated animate__slideInRight';
      this.columnsFlag = !this.columnsFlag;
    }

  }


}
