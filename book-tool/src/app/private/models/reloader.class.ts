import { Router } from "@angular/router";

export class Reloader {

    constructor( private _router:Router ){ }

    reloadComponent() {
        let currentUrl = this._router.url;
            this._router.routeReuseStrategy.shouldReuseRoute = () => false;
            this._router.onSameUrlNavigation = 'reload';
            this._router.navigate([currentUrl]);
        }

}