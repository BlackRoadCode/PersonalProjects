import { AfterViewInit, Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  public user:User = {
    email:'',
    emailVerified:false,
    uid:'',
    photoURL:''
  };

  public numWorks:string = '';
  public numCharacters:string = '';
  public numNotes:string = '';
  public numInspiations:string = '';
  public numTaskLists:string = '';
  public numTimelines:string = '';
  public numSources:string = '';

  public numWorksCreated:string = '';
  public numCharactersCreated:string = '';
  public numNotesCreated:string = '';
  public numInspirationsCreated:string = '';
  public numTasksListsCreated:string = '';
  public numTimelinesCreated:string = '';
  public numSourcesCreated:string = '';

  public render = false;

  constructor( 
    private _authService:AuthService,
     ) { }
    
    ngOnInit(): void { 
      
      this._authService.user$.subscribe( user => {
        
        if ( user.userTU !== undefined ) {
          localStorage.setItem('bp_tu', user.userTU);
        } else {
          localStorage.setItem('bp_tu', '96ghx5-jxiv01318bss128bss99229c7g049c7g21b1u1322rbce9221ka2041ka221ypcmsqmscpt3318x3w128x3w99fqxmoyuhzyhfuxxxxx4bxtswlve2xo-akazgp');
        }
        
        this.getUserElements();
        this.generateUserItems();
    });
    
  }

   generateUserItems(){
    let userToken = localStorage.getItem('bp_tu');
    let typeUser = userToken.substr(44, 3);

    let finishDateFromData = userToken.substr(19,2) + '/' + userToken.substr(13,2) + '/20' + userToken.substr(25,2);
    let finishDate = new Date(finishDateFromData);
    let todayDate = new Date();

    setTimeout(() => {
      if ( todayDate > finishDate ) {
        this.numWorks = '1';
        this.numCharacters = '3';
        this.numNotes = '10';
        this.numInspiations = '10';
        this.numTaskLists = '3';
        this.numTimelines = '1';
        return;
      } else {
  
        switch (typeUser) {
          // LEVEL_A
          case '132':
            this.numWorks = '1';
            this.numCharacters = '3';
            this.numNotes = '10';
            this.numInspiations = '10';
            this.numTaskLists = '3';
            this.numTimelines = '1';
            break;
          // LEVEL_B
          case '489':
            this.numWorks = '2';
            this.numCharacters = '6';
            this.numNotes = '30';
            this.numInspiations = '30';
            this.numTaskLists = '5';
            this.numTimelines = '3';
            break;
          // LEVEL_C
          case '273':
            this.numWorks = '5';
            this.numCharacters = '20';
            this.numNotes = '100';
            this.numInspiations = '100';
            this.numTaskLists = '10';
            this.numTimelines = '10';
            break;
          // LEVEL_D
          case '621':
            this.numWorks = '20';
            this.numCharacters = '100';
            this.numNotes = '999';
            this.numInspiations = '999';
            this.numTaskLists = '999';
            this.numTimelines = '999';
            break;
            // ADMIN
            case '142':
            this.numWorks = '100';
            this.numCharacters = '100';
            this.numNotes = '999';
            this.numInspiations = '999';
            this.numTaskLists = '999';
            this.numTimelines = '999';
            break;
    
          default:
            break;
        }
      }
    }, 500);

   }

   getUserElements() {
     setTimeout(() => {
      this.numWorksCreated = localStorage.getItem('bp_wi');
      this.numCharactersCreated = localStorage.getItem('bp_ca');
      this.numNotesCreated = localStorage.getItem('bp_no');
      this.numSourcesCreated = localStorage.getItem('bp_so');
      this.numTasksListsCreated = localStorage.getItem('bp_ta');
      this.numInspirationsCreated = localStorage.getItem('bp_in');
      this.numTimelinesCreated  = localStorage.getItem('bp_ti');
    }, 500);
  }

}
