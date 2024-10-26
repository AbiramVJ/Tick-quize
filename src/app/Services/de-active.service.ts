import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeActiveService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(this.authService.isLoggedIn());
    if(!this.authService.isLoggedIn()) {
      return !this.authService.isLoggedIn();
    }

    this.router.navigateByUrl('student-home');
    return this.authService.isLoggedIn();


  }
}
