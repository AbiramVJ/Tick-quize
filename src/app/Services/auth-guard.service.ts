import { userRoleNames } from './../Helpers/util';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    //const routeUser = route.data['user'];
    //const roles = userRoleNames;
    const user = this.authService.getUserType();
    const routeUserAccess = route.data['accessUsers'];

  //  console.log(routeUserAccess, user);

    if (routeUserAccess.includes(user)) {
      return true;
    } else {
      this.router.navigateByUrl('not-found');
      return false;

    }
  }
}
