import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './auth/guards/admin.guard';
import { UserGuard } from './auth/guards/user.guard';

const ROUTES: Routes = [
    {
        path: 'admin', 
        canLoad: [ AdminGuard ],
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule )
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
    },
    {
        path: 'private',
        canLoad: [ UserGuard ],
        loadChildren: () => import('./private/private.module').then( m => m.PrivateModule )
    },
    {
        path: '',
        loadChildren: () => import('./public/public.module').then( m => m.PublicModule )
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, {
            onSameUrlNavigation: "ignore",
            anchorScrolling:'enabled',
            scrollPositionRestoration: 'enabled'
        }),
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }