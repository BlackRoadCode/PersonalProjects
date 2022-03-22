import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.interface';

import { AuthService } from 'src/app/auth/services/auth.service';
import { NotesService } from '../../services/notes.service';
import { TasksService } from '../../services/tasks.service';
import { WorksService } from '../../services/works.service';
import { SourcesService } from '../../services/sources.service';
import { TimeLineService } from '../../services/time-line.service';
import { CharactersService } from '../../services/characters.service';
import { InspirationsService } from '../../services/inspirations.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public user: User = {
    email: '',
    emailVerified: false,
    uid: '',
    photoURL: ''
  };

  numCharacters: string = '';
  numNotes: string = '';
  numTaskLists: string = '';
  numInspiations: string = '';
  numWorks: string = '';
  numTimelines: string = '';
  numSources: string = '';

  constructor(private _authService: AuthService,
    private _characterService: CharactersService,
    private _notesService: NotesService,
    private _tasksService: TasksService,
    private _inspirationsService: InspirationsService,
    private _worksService: WorksService,
    private _timelineService: TimeLineService,
    private _sourcesService: SourcesService
  ) { }

  ngOnInit(): void {

    this.getUserElements();

  }

  getUserElements() {

    this._authService.user$.subscribe(user => {
      this.user = user

      if ( localStorage.getItem('bp_wi') ) {
        this.numWorks = localStorage.getItem('bp_wi');
      } else {
        this._worksService.getWorksLength(this.user.uid).subscribe(res => {
          this.numWorks = res.length.toString();
          localStorage.setItem('bp_wi', this.numWorks);
        });
      }
      
      if ( localStorage.getItem('bp_ca') ) {
        this.numCharacters = localStorage.getItem('bp_ca');
      } else {
        this._characterService.getCharacters(this.user.uid).subscribe(res => {
          this.numCharacters = res.length.toString();
          localStorage.setItem('bp_ca', this.numCharacters);
        });
      }

      if ( localStorage.getItem('bp_no') ) {
        this.numNotes = localStorage.getItem('bp_no');
      } else {
        this._notesService.getNotes(this.user.uid).subscribe(res => {
          this.numNotes = res.length.toString();
          localStorage.setItem('bp_no', this.numNotes);
        });
      }

      if ( localStorage.getItem('bp_so') ) {
        this.numSources = localStorage.getItem('bp_so');
      } else {
        this._sourcesService.getSources(this.user.uid).subscribe(res => {
          this.numSources = res.length.toString();
          localStorage.setItem('bp_so', this.numSources);
        });
      }      
      
      if ( localStorage.getItem('bp_ta') ) {
        this.numTaskLists = localStorage.getItem('bp_ta');
      } else {
        this._tasksService.getTaskLists(this.user.uid).subscribe(res => {
          this.numTaskLists = res.length.toString();
          localStorage.setItem('bp_ta', this.numTaskLists);
        });
      }
      
      if ( localStorage.getItem('bp_in') ) {
        this.numInspiations = localStorage.getItem('bp_in');
      } else {
        this._inspirationsService.getInspirations(this.user.uid).subscribe(res => {
          this.numInspiations = res.length.toString();
          localStorage.setItem('bp_in', this.numInspiations);
        });
      }
      
      if ( localStorage.getItem('bp_ti') ) {
        this.numTimelines = localStorage.getItem('bp_ti');
      } else {
        this._timelineService.getTimelines(this.user.uid).subscribe(res => {
          this.numTimelines = res.length.toString();
          localStorage.setItem('bp_ti', this.numTimelines);
        });
      }

    });

  }

}
