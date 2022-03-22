import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prices-table',
  templateUrl: './prices-table.component.html',
  styles: [
  ]
})
export class PricesTableComponent implements OnInit {

  valorRango:number = 1;

  constructor() { }

  ngOnInit(): void {  }  

}
