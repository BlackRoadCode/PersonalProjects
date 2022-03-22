import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AblogComponent } from './pages/ablog/ablog.component';

import { DictionaryLoadingComponent } from './pages/dictionary-loading/dictionary-loading.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ReportComponent } from './pages/report/report.component';
import { UsersComponent } from './pages/users/users.component';

const routes:Routes = [
  { 
    path: '', 
    children: [
      {
        path:'', 
        component:DashboardComponent,
        children:[
          { path:'blog', component:AblogComponent },
          { path:'contact', component:ContactComponent },
          { path:'dictionary', component:DictionaryLoadingComponent },
          { path:'report', component:ReportComponent },
          { path:'users', component:UsersComponent },
        ]
      },
      { path:'', redirectTo: '' },
      { path:'**', redirectTo: '' }
    ]
}
]


@NgModule({ 
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }
