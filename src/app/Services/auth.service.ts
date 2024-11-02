import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:any = 'https://localhost:7000/api/';

  private userSubject$ = new BehaviorSubject<any>(null);
  user$ = this.userSubject$.asObservable();

  logoutEvent = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  public logIn(body:any){
    return this.http.post<any>(this.baseUrl + 'Auth/login/student',body);
  }

  public adminLogin(body:any){
    return this.http.post<any>(this.baseUrl + 'Auth/login/qw/admin',body);
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

  public getIndex(){
    return localStorage.getItem('index');
  }

  public removeItems(){

  }


  public setUserDetails(userDetails:any){
    this.userSubject$.next(userDetails);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('login-type');
    localStorage.removeItem('index');
    this.logoutEvent.emit();
  }
}
