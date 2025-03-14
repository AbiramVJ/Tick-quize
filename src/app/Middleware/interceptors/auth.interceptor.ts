import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';


export const AuthInterceptor: HttpInterceptorFn = (request:any, next:any) => {
  const authService = inject(AuthService);
  if (authService.isLoggedIn()) {
    const token = authService.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};
