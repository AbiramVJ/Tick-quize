import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Batch, Student } from '../Models/student';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = (environment as any).baseUrl;

  constructor(private http: HttpClient) { }

  public getAllBatches(){
    return this.http.get<any>(`${this.baseUrl}Batch/getall`).pipe(
      map((res: any) => {
        if (res) {
          return {
            data: res.Result.data.map((batch: any) => new Batch(batch)),
            totalCount: res.Result.totalCount
          };
        } else {
          return [];
        }
      })
    );
  }

  public addStudent(body:any){
      // delete body['line1'];
      // delete body['line2'];
      // delete body['province'];
      // delete body['country'];
    return this.http.post<any>(`${this.baseUrl}Auth/student`, body);
  }

  public getAllStudent(params:any){
    return this.http.get<any>(`${this.baseUrl}Students/getall?pageSize=${params.itemsPerPage}&pageNo=${params.pageNumber}&searchTerm=${params.searchText}&batchId=${params.batchId}`).pipe(
      map((res: any) => {
        if (res) {
          return {
            data: res.Result.data.map((batch: any) => new Student(batch)),
            totalCount: res.Result.totalCount
          };
        } else {
          return [];
        }
      })
    );
  }

  public createAddress(body:any, stuId:any){
    return this.http.post<any>(`${this.baseUrl}Students/${stuId}/add-address`, body);

  }

  public getStudentAddress(stuId:string){
    return this.http.get<any>(`${this.baseUrl}Batch/getall`).pipe(
      map((res: any) => {
        if (res) {
          return {
            data: res.Result.data.map((batch: any) => new Batch(batch)),
            totalCount: res.Result.totalCount
          };
        } else {
          return [];
        }
      })
    );
  }
}
