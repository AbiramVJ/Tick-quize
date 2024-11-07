import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl:any = 'https://localhost:7000/api/';


  constructor(private http: HttpClient) { }

  public createAdminUser(body:any){
    return this.http.post<any>(this.baseUrl + 'Auth/qw/admin',body);
  }


}
