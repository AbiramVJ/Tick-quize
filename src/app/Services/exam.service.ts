import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private baseUrl:any = 'https://localhost:7000/api/';
  constructor(private http: HttpClient) { }

  public getExamsDetails() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}Exam/get-active`, { headers }).pipe(
      map((res: any) => {
        if (res) {
          return res;
        } else {
          return [];
        }
      })
    );
  }

  public startExam(examId:string){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = {examId:examId}
    return this.http.post<any>(`${this.baseUrl}Students/attend-to-exam`, body,{headers});
  }

  public getQuestionsDetails(examId:string){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}Students/get-exam-questions/${examId}`, { headers }).pipe(
      map((res: any) => {
        if (res) {
          return res;
        } else {
          return [];
        }
      })
    );

  }

}
