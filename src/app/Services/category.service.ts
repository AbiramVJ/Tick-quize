import { routes } from './../app.routes';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Question, QuestionList } from '../Models/examQuestions';
import { Category } from '../Models/category';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = (environment as any).baseUrl;



  constructor(private http: HttpClient) { }

  public getAllCategories(pageSize:number,pageNumber:number){
    return this.http.get<any>(`${this.baseUrl}Category/getall?pageSize=${pageSize}&pageNo=${pageNumber}`).pipe(
      map((res: any) => {
        if (res) {
          return res.Result.data.map((c:any)=> new Category(c));
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

          return res.Result.data.map((c:any)=> new Category(c));
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

  public getAllQuestions(params:any){
    return this.http.get<any>(`${this.baseUrl}Question/getall?pageSize=${params.itemsPerPage}&pageNo=${params.pageNumber}&categoryId=${params.categoryId}`).pipe(
      map((res: any) => {
        if (res) {
          return {
            data: res.Result.data.map((c: any) => new QuestionList(c)),
            totalCount: res.Result.totalCount
          };
        } else {
          return [];
        }
      })
    );
  }


}
