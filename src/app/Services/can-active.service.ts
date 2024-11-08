import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CanActiveService implements CanActivate {
  private baseUrl = (environment as any).baseUrl;

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const routeUserAccess = route.data['accessUsers'];
    const loginUserType = this.authService.getUserType();

   // console.log(routeUserAccess,loginUserType)

    if(this.authService.isLoggedIn()) {
      return this.authService.isLoggedIn();
    }

    this.router.navigateByUrl('login');
    return !this.authService.isLoggedIn();
    // if (state.url === '/login' && this.authService.isLoggedIn()) {
    //   this.router.navigateByUrl('/student-home');
    // }

    // if (routeUserAccess.includes(loginUserType) && loginUserType !== null) {
    //   return true;
    // } else {
    //   this.router.navigateByUrl('login');
    //   return true;
    // }
  }
}
