import { Component, HostListener } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, LocationStrategy } from '@angular/common';
import { ExamService } from '../../Services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../Models/examQuestions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule, FormsModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent {
  public examQuestions:Question[] = [];
  public timerInterval: any;
 // selectedAnswers: { [questionId: number]: number } = {};
  public minutes: number = 60;
  public seconds: number = 0;
  public currentPage:number = 1;
  public isLastPage:boolean = false;
  public itemsPerPage:number = 2;
  public loadingIndicator:boolean = false;

  public examId:any;

  public selectedAnswers: { id: number; answerOptionId: number }[] = [];
  constructor(
    private toastr: ToastrService,
    private examService:ExamService,
    private activeRoute:ActivatedRoute,
    private location: LocationStrategy,
    private router:Router,
  ){}

  ngOnInit() {
    this.examId = this.activeRoute.snapshot.paramMap.get('id');
    this._startExam();
    this.preventBackButton();
  }

  public _startExam(){
    this.loadingIndicator = true;
    this.examService.startExam(this.examId).subscribe({
      next:()=>{
        this._getExamQuestions(this.examId);
      },
      complete:()=>{

      },
      error:(error:any)=>{
        this.loadingIndicator = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
        this.router.navigate(['student-home']);
      }
    })

  }

  public _getExamQuestions(id:string){
    this.examService.getQuestionsDetails(id).subscribe({
      next:(res:any)=>{
        this.examQuestions = res;
        this.loadingIndicator = false;
      },
      complete:()=>{
        this.startTimer();
      },
      error:(error:any)=>{
        this.loadingIndicator = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);

      }
    })
  }

  startTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
          if(this.minutes === 5){
            this.toastr.warning('!Warring', '5 min left please check your answer and ready to submit')
          }
        } else {
          this.timeUp();
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  private timeUp() {
    clearInterval(this.timerInterval);
    this.submitAnswer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }


  private preventBackButton() {
    history.pushState(null, '', window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, '', window.location.href);
    })
  }

  public updatedAnswer(questionId: any, answerId: any) {
    this.examQuestions.forEach((question: any) => {
      if (question.id === questionId) {
          question.answerOptions.forEach((q: any) => {
            q.isChecked = q.id === answerId;
        });
      }
    });

    this.examService.saveExamAnswer(this.examQuestions);
  }

  public onPageChange(event:any){
    this.currentPage = event;
    this.updateIsLastPage();
  }

  private updateIsLastPage() {
    const totalPages = Math.ceil(this.examQuestions.length / this.itemsPerPage);
    this.isLastPage = this.currentPage === totalPages;
  }

  public submitAnswer(){
    this.loadingIndicator = true;
    this.prepareBody();
    if(this.selectedAnswers.length > 0){
      this.examService.submitExam( this.selectedAnswers ,this.examId).subscribe({
        next:(res:any)=>{
          this.toastr.success(res.Result.message);
          this.examService.removeAnswer();
          this.router.navigate(['student-home']);
        },
        complete:()=>{
          this.loadingIndicator = false;
        },
        error :(err:any) => {
          console.log(err);
          this.toastr.error(err.error.Error.Title, err.error.Error.Detail);
        }
      })
    }
  }

  public prepareBody() {
    this.selectedAnswers = [];
    this.examQuestions.forEach((q: any) => {
      q.answerOptions.forEach((a: any) => {
        if (a.isChecked) {
          this.selectedAnswers.push({ id: q.id, answerOptionId: a.id });
        }
      });
    });
  }
}
