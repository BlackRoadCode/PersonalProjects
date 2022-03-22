import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styleUrls: ['../assets/css/superhero.css']
})
export class AppComponent implements OnInit { 

  constructor( public translateService:TranslateService ) { 
    translateService.addLangs([ 'es', 'en' ]);
    translateService.setDefaultLang( 'es' );
   }

  ngOnInit(): void {
    if ( localStorage.getItem('bp_lng') ){
      this.translateService.use(localStorage.getItem('bp_lng'));  
    }
  }

  title = 'book-generator';

}
