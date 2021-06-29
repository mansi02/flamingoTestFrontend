import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SessionUserModel } from 'app/common/models/sessionUsers/session-user.model';
import { from, Observable } from 'rxjs';

import { SessionService} from 'app/common/services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.sessionService.get())
      if (!this.sessionService.get()){
        console.log("login failed");
        this.router.navigate(['/login']);
        return false;
      }
    return true;
  }
}
