import { CommonModule, LocationStrategy, PlatformLocation } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

import { ExamService } from '../../../Services/exam.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.scss'
})
export class StudentHomeComponent implements OnInit {
  public activeDetails:any = [];
  public examId:string = '';
  constructor(private examService:ExamService,
    private toastr: ToastrService,
    private location: LocationStrategy,){

  }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   $event.returnValue = 'Are you sure you want to leave the exam?';
  // }

  ngOnInit() {
    this._getExamDetails();
   // this.preventBackButton();
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




  // private preventBackButton() {
  //   history.pushState(null, '', window.location.href);
  //   this.location.onPopState(() => {
  //     history.pushState(null, '', window.location.href);
  //   })
  // }


}
