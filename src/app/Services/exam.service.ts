import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Question } from '../Models/examQuestions';
import { AssignCategory, Exam } from '../Models/exam';

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

  public addQuestion(body:any){
    return this.http.post<any>(`${this.baseUrl}Question`, body);
  }

  public getAllExam(pageSize:number,pageNumber:number){
    return this.http.get<any>(`${this.baseUrl}Exam/getall?pageSize=${pageSize}1&pageNo=${pageNumber}`).pipe(
      map((res: any) => {

      //  console.log(res);
        if (res) {
          return res.Result.data.map((e:any) => new Exam(e));
        } else {
          return [];
        }
      })
    );
  }

  public addExam(body:any){
    return this.http.post<any>(`${this.baseUrl}Exam`, body);
  }

  public editExam(body:any, examId:string){
    let putBody = body;
    delete putBody['id'];
    return this.http.put<any>(`${this.baseUrl}Exam/${examId}`, body);

  }

  public addQuestionToCategory(body:any, examId:string){
    console.log(examId);
    return this.http.post<any>(`${this.baseUrl}Exam/${examId}/add-categories`,body);
  }

  public getAssignCategory(examId:string){
    return this.http.get<any>(`${this.baseUrl}Exam/${examId}/get-categories`).pipe(
      map((res: any) => {
        if (res) {
          return res.Result.map((c:any) => new AssignCategory(c));
        } else {
          return [];
        }
      })
    );
  }

  public deleteExam(id:string){
    return this.http.delete<any>(`${this.baseUrl}Exam/${id}`);

  }

}
