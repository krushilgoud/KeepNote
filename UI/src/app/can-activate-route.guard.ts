import { routes } from './../../test/routes.test';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  routable = true;

  constructor(private authService: AuthenticationService,
  private routerService: RouterService) {
    this.routable = true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
      const authPromise = this.authService.isUserAuthenticated();
      return authPromise.then(isAuthenticated => {
        //console.log("isAuthenticated :: "+isAuthenticated);
        if (!isAuthenticated || isAuthenticated === undefined || isAuthenticated === null) {
          this.routerService.routeToLogin();
        }
        return isAuthenticated;
      });
    }
}
