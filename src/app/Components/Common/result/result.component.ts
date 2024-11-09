import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExamService } from '../../../Services/exam.service';
import { ToastrService } from 'ngx-toastr';
import { Exam } from '../../../Models/exam';
import { ExamResultsResponseModel } from '../../../Models/result';
import { NgLabelTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, FormsModule,NgxPaginationModule, FormsModule,NgSelectComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit {

  public totalCount:number = 0;
  public itemsPerPage:number = 5;
  public currentPage:number = 1;

  public selectedExamId:string = '';

  public loadingIndicator:boolean = false;
  public exam:Exam[] = [];

  public result:ExamResultsResponseModel[] = [];

  constructor(
    private toastr: ToastrService,
    private examService:ExamService,) {
  }


  ngOnInit(){
    this._getAllExam();
  }

  private _getAllExam(){
    this.examService.getAllExamWithoutPagination().subscribe({
      next:(res:any)=>{
        this.exam = res;
        this.selectedExamId = this.exam[0].id;

      },
      complete:()=>{
        this.loadingIndicator = false;
        this._getAllResultByExamId();
      },
      error:(error:any)=>{
        this.loadingIndicator = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }
    })
  }


  public _getAllResultByExamId(){
    this.loadingIndicator = true;

    this.examService.getAllResultByExamId(this.selectedExamId).subscribe({
      next:(res:any)=>{
        this.result = res;
      },
      complete:()=>{
        this.loadingIndicator = false;
      },
      error:(error:any)=>{
        this.loadingIndicator = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }
    })
  }

  public filterExam(){
    this._getAllResultByExamId();
  }


}
