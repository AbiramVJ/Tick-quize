import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = (environment as any).baseUrl;

  constructor(private http: HttpClient) { }

  public createAdminUser(body:any){
    return this.http.post<any>(this.baseUrl + 'Auth/qw/admin',body);
  }

  public getAllAdminUsers(){
    return this.http.get<any>(`${this.baseUrl}Admin/getall`).pipe(
      map((res: any) => {
        if (res) {
          return {
            data: res.Result.data,
            totalCount: res.Result.totalCount
          };

        } else {
          return [];
        }
      })
    );
  }


}
