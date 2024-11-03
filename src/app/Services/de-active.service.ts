import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeActiveService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.getUserType();
    if(!this.authService.isLoggedIn()) {
      return !this.authService.isLoggedIn();
    }

    user === 'Student' ? this.router.navigateByUrl('student-home') : this.router.navigateByUrl('admin/home');
    return this.authService.isLoggedIn();


  }
}
