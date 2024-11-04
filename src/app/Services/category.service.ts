import { routes } from './../app.routes';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Question } from '../Models/examQuestions';
import { Category } from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl:any = 'https://localhost:7000/api/';


  constructor(private http: HttpClient) { }

  public getAllCategories(pageSize:number,pageNumber:number){
    return this.http.get<any>(`${this.baseUrl}Category/getall?pageSize=${pageSize}&pageNo=${pageNumber}`).pipe(
      map((res: any) => {
        if (res) {
          return res.Result.map((c:any)=> new Category(c));
        } else {
          return [];
        }
      })
    );
  }

  public getAllCategoriesList(){
    return this.http.get<any>(`${this.baseUrl}Category/getall`).pipe(
      map((res: any) => {
        if (res) {
          return res.Result.map((c:any)=> new Category(c));
        } else {
          return [];
        }
      })
    );
  }

  public addCategory(body:any){
    return this.http.post<any>(`${this.baseUrl}Category`, body);
  }

  public updateCategory(body:any,id:string){
    body['id'] = id;
    return this.http.put<any>(`${this.baseUrl}Category?id=${body.id}`, body);
  }

  public deleteCategory(id:string){
    return this.http.delete<any>(`${this.baseUrl}Category?id=${id}`);
  }

  
}
