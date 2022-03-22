import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NavbarComponent } from './navbar/navbar.component';
import { PrefooterComponent } from './prefooter/prefooter.component';
import { FooterComponent } from './footer/footer.component';
import { PipesModule } from 'src/app/auth/pipes/pipes.module';

@NgModule({
  declarations: [
    NavbarComponent,
    PrefooterComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    PipesModule
  ], exports:[
    NavbarComponent,
    PrefooterComponent,
    FooterComponent
  ]
}) 
export class SharedModule { }
