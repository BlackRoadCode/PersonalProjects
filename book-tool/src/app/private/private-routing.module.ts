import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Principal routes
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { InspirationComponent } from './pages/inspiration/inspiration.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SourcesComponent } from './pages/sources/sources.component';
import { EditorComponent } from './pages/editor/editor.component';
import { NotesComponent } from './pages/notes/notes.component';
import { TasksComponent } from './pages/tasks/tasks.component';
// Children routes
import { SynonymDictionaryComponent } from './pages/resources/synonym-dictionary/synonym-dictionary.component';
import { CecharactersComponent } from './pages/characters/cecharacters/cecharacters.component';
import { AbbreviationComponent } from './pages/resources/dictionary/abbreviation/abbreviation.component';
import { SecharacterComponent } from './pages/characters/secharacter/secharacter.component';
import { CetimelineComponent } from './pages/timeline/cetimeline/cetimeline.component';
import { DictionaryComponent } from './pages/resources/dictionary/dictionary.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { CeeditorComponent } from './pages/editor/ceeditor/ceeditor.component';
import { SeeditorComponent } from './pages/editor/seeditor/seeditor.component';
import { CetasksComponent } from './pages/tasks/cetasks/cetasks.component';
import { AccountComponent } from './pages/account/account.component';
import { GenNameComponent } from './pages/resources/gen-name/gen-name.component';

const routes:Routes = [
  { 
    path: '', 
    children: [
      { 
        path:'dashboard', 
        component:DashboardComponent,
        children:[
          {
            path:'home-dashboard',
            component:HomeDashboardComponent
          },
          {
            path:'editor',
            component:EditorComponent
          },
          {
            path:'editor/:id',
            component:CeeditorComponent
          },
          {
            path:'editor/:id/view',
            component:SeeditorComponent
          },
          {
            path:'characters',
            component:CharactersComponent
          },
          {
            path:'characters/:action',
            component:CecharactersComponent
          },
          {
            path:'characters/see/:idCharacter',
            component:SecharacterComponent
          },
          {
            path:'notes',
            component:NotesComponent
          },
          {
            path:'sources',
            component:SourcesComponent
          },
          {
            path:'tasks',
            component:TasksComponent
          },
          {
            path:'tasks/:action',
            component:CetasksComponent
          },
          {
            path:'inspiration',
            component:InspirationComponent
          },
          {
            path:'time-line',
            component:TimelineComponent
          },
          {
            path:'time-line/:id',
            component:CetimelineComponent
          },
          {
            path:'contact',
            component:ContactComponent
          },
          {
            path:'account',
            component:AccountComponent
          },
          {
            path:'resources',
            component:ResourcesComponent
          },
          {
            path:'resources/dictionary',
            component:DictionaryComponent
          },
          {
            path:'resources/synonym',
            component:SynonymDictionaryComponent
          },
          {
            path:'resources/dictionary/pabbreviation',
            component:AbbreviationComponent
          },
          {
            path:'resources/gen-name',
            component:GenNameComponent
          },
        ]
       },
      { path:'', redirectTo: 'dashboard' },
      { path:'**', redirectTo: 'dashboard' }
    ]
}
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [ RouterModule ]
})
export class PrivateRoutingModule { }
