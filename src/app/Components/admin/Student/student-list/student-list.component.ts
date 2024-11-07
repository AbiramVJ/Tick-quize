import { StudentService } from './../../../../Services/student.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppLoadingComponent } from "../../../Common/under-constraction/app-loading/app-loading.component";
import { ToastrService } from 'ngx-toastr';
import { Batch, Student } from '../../../../Models/student';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule, NgxPaginationModule, ReactiveFormsModule, AppLoadingComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {

  public items:any = [1,2,3,4,5,6];
  public batches:Batch [] = [];
  public students:Student[] = [];
  public selectedBatch:any;

  public studentForm!:FormGroup;

  public loadingIndicator:boolean = false;
  public isSubmitted:boolean = false;
  public isUpdate:boolean = false;

  public totalCount:number = 0;
  public itemsPerPage:number = 5;
  public currentPage:number = 1;

  public selectedBatId:string = '';

  constructor(private fb:FormBuilder, private studentService:StudentService,  private toastr: ToastrService,){
    this.studentFormInit();
  }

  ngOnInit() {
    this._getAllBatches();
    this._getAllStudent();
  }

  public studentFormInit(){
    this.studentForm = this.fb.group({
      batchId: ['', Validators.required],
      admissionNo: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      eMail: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      joinedDate: ['', Validators.required],
      imagUrl: [''],
      gender: [0, Validators.required],
      civilStatus: [0, Validators.required]
    });
  }




  filterByBatch(event:any){

  }
  onPageChange(event:any){

  }

  public _updateStudent(){

  }

  public submit(){
    this.isSubmitted = true;
    if(this.studentForm.valid){

      let body = this.studentForm.value;
      body['gender'] = Number(body['gender']);
      body['civilStatus'] = Number(body['civilStatus']);
      this.studentService.addStudent(body).subscribe({
        next:(res:any) => {
          this.toastr.error('student created','success');
        },
        complete:() => {
          this.loadingIndicator = false;
          this.isSubmitted = false;
          var modalElement: HTMLElement = document.getElementById('close-student')as HTMLElement;
          if(modalElement !== null){
            modalElement.click();
          }
        },
        error:(error:any) => {
          this.loadingIndicator = false;
          this.isSubmitted = false;
          this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
        }
      })
    }
  }

  public _getAllBatches(){
    this.loadingIndicator = true;
    this.studentService.getAllBatches().subscribe({
      next:(res:any) => {
        this.batches = res.data;
      },
      complete:() => {
        this.loadingIndicator = false;

      },
      error:(error:any) => {
        this.loadingIndicator = false;
        this.isSubmitted = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }
    })
  }

  public _getAllStudent(){
    this.loadingIndicator = true;
    this.studentService.getAllStudent().subscribe({
      next:(res:any) => {
        this.students = res.data;
        this.totalCount = res.totalCount;
      },
      complete:() => {
        this.loadingIndicator = false;

      },
      error:(error:any) => {
        this.loadingIndicator = false;
        this.isSubmitted = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }
    })
  }

}
