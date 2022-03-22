import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterContentChecked {

  public lnd:string;

  constructor( private _router:Router ) { }

  ngOnInit(): void { }

  ngAfterContentChecked(): void { 
    if (this._router.url.endsWith('#up')) {
      let url = this._router.url;
      let urlNew = url.replace('#up', '');
      this.lnd = urlNew;
    } else {
      this.lnd = this._router.url;
    }
  }

}
