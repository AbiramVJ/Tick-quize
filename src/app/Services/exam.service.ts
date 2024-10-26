import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Question } from '../Models/examQuestions';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private baseUrl:any = 'https://localhost:7000/api/';

  constructor(private http: HttpClient) { }

  public getExamsDetails() {
    return this.http.get<any>(`${this.baseUrl}Exam/get-active`).pipe(
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
    const body = {examId:examId}
    return this.http.post<any>(`${this.baseUrl}Students/attend-to-exam`, body);
  }

  public getQuestionsDetails(examId:string){
    return this.http.get<any>(`${this.baseUrl}Students/get-exam-questions/${examId}`).pipe(
      map((res: any) => {
        if (res) {
          return res.Result.map((questions:any) => new Question(questions));
        } else {
          return [];
        }
      })
    );

  }

  public submitExam(body:any, examId:string){
    return this.http.post<any>(`${this.baseUrl}Students/exam-submit/${examId}`, body);
  }

  public saveExamAnswer(answer:any){
    localStorage.setItem('answer', JSON.stringify(answer));
  }

  public getAnswer(){
    const answer = localStorage.getItem('answer');
    return answer ? JSON.parse(answer) : null;
  }

  public removeAnswer(){
    localStorage.removeItem('answer');
  }

}
