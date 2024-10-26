import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:any = 'https://localhost:7000/api/';

  private userSubject$ = new BehaviorSubject<any>(null);
  user$ = this.userSubject$.asObservable();

  constructor(private http: HttpClient) { }

  public logIn(body:any){
    return this.http.post<any>(this.baseUrl + 'Auth/login/student',body);
  }

  public getUserType(){
    let loginUserRole = localStorage.getItem('login-type');
    return loginUserRole
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public getToken(){
    return localStorage.getItem('token');
  }


  public setUserDetails(userDetails:any){
    this.userSubject$.next(userDetails);
    console.log(userDetails);
  }
}
