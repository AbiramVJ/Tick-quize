import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { ExamService } from '../../../Services/exam.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.scss'
})
export class StudentHomeComponent implements OnInit {
  public currentPage:number = 1;
  public examQuestions:any = [];
  public activeDetails:any = [];
  public examId:string = '';

  public isStartExam:boolean = false;
  constructor(private examService:ExamService,private toastr: ToastrService){

  }
  ngOnInit() {
    this._getExamDetails();
  }

  public _getExamDetails(){
    this.examService.getExamsDetails().subscribe({
      next:(res:any)=>{
        this.activeDetails = res.Result;
      },
      complete:() => {

      },
      error(error:any){

      }

    })
  }

  public startExam(id:string){
    this.examService.startExam(id).subscribe({
      next:()=>{

      },
      complete:()=>{
        this._getExamQuestions(id);
      },
      error:(error:any)=>{
        console.log(error)
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);

      }
    })

  }

  public _getExamQuestions(id:string){
    this.isStartExam = true;
    this.examService.getQuestionsDetails(id).subscribe({
      next:(res:any)=>{
        this.examQuestions = res.Result;
      },
      complete:()=>{
      },
      error:(error:any)=>{

      }
    })
  }

}
