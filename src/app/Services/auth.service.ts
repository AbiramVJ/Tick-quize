import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:any = 'https://localhost:7000/api/';
  constructor(private http: HttpClient) { }

  public logIn(body:any){
    return this.http.post<any>(this.baseUrl + 'Auth/login/student',body);
  }
}
