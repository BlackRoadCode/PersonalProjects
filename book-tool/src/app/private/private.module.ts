import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { PrivateRoutingModule } from './private-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule} from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ExportAsModule } from 'ngx-export-as';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/components/shared.module';
import { QuillModule } from 'ngx-quill'
import { NgModule } from '@angular/core';
import Counter from '../private/helpers/counter'

// Components
import { SubnavbarComponent } from './components/subnavbar/subnavbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// Pages
import { DashboardContentComponent } from './pages/dashboard-content/dashboard-content.component';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { CecharactersComponent } from './pages/characters/cecharacters/cecharacters.component';
import { InspirationComponent } from './pages/inspiration/inspiration.component';
import { SecharacterComponent } from './pages/characters/secharacter/secharacter.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { CetimelineComponent } from './pages/timeline/cetimeline/cetimeline.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SeeditorComponent } from './pages/editor/seeditor/seeditor.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { CeeditorComponent } from './pages/editor/ceeditor/ceeditor.component';
import { SourcesComponent } from './pages/sources/sources.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CetasksComponent } from './pages/tasks/cetasks/cetasks.component';
import { AccountComponent } from './pages/account/account.component';
import { EditorComponent } from './pages/editor/editor.component';
import { NotesComponent } from './pages/notes/notes.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { PipesModule } from '../auth/pipes/pipes.module';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { TypeUserPipe } from './pipes/type-user.pipe';
import { ResourcesComponent } from './pages/resources/resources.component';
import { GenNameComponent } from './pages/resources/gen-name/gen-name.component';
import { WebpageSourceComponent } from './pages/sources/webpage-source/webpage-source.component';
import { BookSourceComponent } from './pages/sources/book-source/book-source.component';
import { ReportSourceComponent } from './pages/sources/report-source/report-source.component';
import { ScientificmagazineSourceComponent } from './pages/sources/scientificmagazine-source/scientificmagazine-source.component';
import { PictureSourceComponent } from './pages/sources/picture-source/picture-source.component';
import { DictionaryComponent } from './pages/resources/dictionary/dictionary.component';
import { AbbreviationComponent } from './pages/resources/dictionary/abbreviation/abbreviation.component';
import { SynonymDictionaryComponent } from './pages/resources/synonym-dictionary/synonym-dictionary.component';

@NgModule({
  imports: [
    AngularFireStorageModule,
    PrivateRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild(),
    DragDropModule,
    ExportAsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    PipesModule,
    QuillModule.forRoot({
      customModules: [{
        implementation: Counter,
        path: 'modules/counter'
      }],
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    })
  ],
  declarations: [
    DashboardContentComponent,
    HomeDashboardComponent,
    CecharactersComponent,
    InspirationComponent,
    SecharacterComponent,
    CharactersComponent,
    CetimelineComponent,
    DashboardComponent,
    SubnavbarComponent,
    TimelineComponent,
    SeeditorComponent,
    CeeditorComponent,
    SidebarComponent,
    SourcesComponent,
    ContactComponent,
    CetasksComponent,
    AccountComponent,
    EditorComponent,
    NotesComponent,
    TasksComponent,
    NgDropFilesDirective,
    TypeUserPipe,
    ResourcesComponent,
    GenNameComponent,
    WebpageSourceComponent,
    BookSourceComponent,
    ReportSourceComponent,
    ScientificmagazineSourceComponent,
    PictureSourceComponent,
    DictionaryComponent,
    AbbreviationComponent,
    SynonymDictionaryComponent
  ]
})
export class PrivateModule { }
