import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ReportComponent } from './pages/report/report.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AblogComponent } from './pages/ablog/ablog.component';
import { DictionaryLoadingComponent } from './pages/dictionary-loading/dictionary-loading.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UsersComponent,
    ReportComponent,
    ContactComponent,
    AblogComponent,
    DictionaryLoadingComponent
  ]
})
export class AdminModule { }
