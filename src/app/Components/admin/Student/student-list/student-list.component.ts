import { StudentService } from './../../../../Services/student.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppLoadingComponent } from "../../../Common/under-constraction/app-loading/app-loading.component";
import { ToastrService } from 'ngx-toastr';
import { Batch, Student } from '../../../../Models/student';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule, NgxPaginationModule, ReactiveFormsModule, AppLoadingComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  public searchValue = new BehaviorSubject<any>(null);
  public gender:any = [{id:1, name:'Male'},{id:2, name:'Female'},{id:3, name:'Other'}];
  public civilStatus:any = [{id:1, name:'Single'},{id:2, name:'Married'},{id:3, name:'Divorced'}];

  public batches:Batch [] = [];
  public students:Student[] = [];
  public selectedBatchId:any;

  public studentForm!:FormGroup;

  public loadingIndicator:boolean = false;
  public isSubmitted:boolean = false;
  public isUpdate:boolean = false;

  public totalCount:number = 0;
  public itemsPerPage:number = 5;
  public currentPage:number = 1;

  public searchText:string = '';
  public editStuId:string = '';


 public params = {
  itemsPerPage : this.itemsPerPage,
  pageNumber:this.currentPage,
  searchText:this.searchText,
  batchId:'',
}

  constructor(private fb:FormBuilder, private studentService:StudentService,  private toastr: ToastrService,){
    this.studentFormInit();
  }

  ngOnInit() {
    this._getAllBatches();
    this.searchValue.pipe(debounceTime(1000)).subscribe(searchText => {
      if (searchText != null) {
        this.getSearchActivities(searchText);
      }
    });
  }

  public studentFormInit(){
    this.studentForm = this.fb.group({
      batchId: ['', Validators.required],
      admissionNo: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: [''],
      eMail: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      joinedDate: ['', Validators.required],
      imagUrl: [''],
      gender: [0, Validators.required],
      civilStatus: [0, Validators.required],

      line1: ['', Validators.required],
      line2: [''],
      city: ['', Validators.required],
      province: ['', Validators.required],
      country: ['SriLanka', Validators.required],
    });
  }

  public _updateStudent(){

  }

  public submit(){
    this.isSubmitted = true;
    console.log(this.studentForm.valid);
    console.log(this.studentForm.value);
    this.isUpdate ? this.studentForm.get('password')?.clearValidators() : this.studentForm.get('password')?.setValidators([Validators.required]) ;

    if(this.studentForm.valid){
      this.loadingIndicator = true;
      let body = this.studentForm.value;

      if(this.isUpdate){
        body['id'] = this.editStuId
        this.studentService.updateStudent(body).subscribe({
          next:(res:any) => {
            this.createAddress(res.Result.id)
          },
          complete:() => {
            this.loadingIndicator = false;
            this.isSubmitted = false;

          },
          error:(error:any) => {
            this.loadingIndicator = false;
            this.isSubmitted = false;
            this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
          }
        })
      }else{
        this.studentService.addStudent(body).subscribe({
          next:(res:any) => {
            this.createAddress(res.Result.id)
          },
          complete:() => {
            this.loadingIndicator = false;
            this.isSubmitted = false;

          },
          error:(error:any) => {
            this.loadingIndicator = false;
            this.isSubmitted = false;
            this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
          }
        })
      }

    }
  }

  public _getAllBatches(){
    this.loadingIndicator = true;
    this.studentService.getAllBatches().subscribe({
      next:(res:any) => {
        this.batches = res.data;
        this.selectedBatchId = this.batches[0].id;
        this.params.batchId = this.selectedBatchId;
      },
      complete:() => {
        this.loadingIndicator = false;
        this._getAllStudent();
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
    this.studentService.getAllStudent(this.params).subscribe({
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

  public createAddress(stud:string){
    const formsValue = this.studentForm.value;
   console.log(formsValue)
    let body = {
      line1: formsValue.line1,
      line2: formsValue.line2,
      city: formsValue.city,
      province: formsValue.province,
      country: formsValue.country
    }

    this.studentService.createAddress(body,stud).subscribe({
      next:(res:any) => {
        this.toastr.success('student created','success');
      },
      complete:() => {
        this.loadingIndicator = false;
        var modalElement: HTMLElement = document.getElementById('close-student')as HTMLElement;
          if(modalElement !== null){
            modalElement.click();
          }
          this._getAllStudent();
          this.isUpdate = false;
      },
      error:(error:any) => {
        this.loadingIndicator = false;
        this.isSubmitted = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }
    })
  }

  public setEditStudentData(student:Student){
    this.isUpdate = true;
    this.editStuId = student.id
    let setBody = {
      batchId:student.batchId ,
      admissionNo:student.admissionNo ,
      firstName:student.firstName ,
      lastName:student.lastName ,
      password:student.password ,
      eMail:student.eMail ,
      phoneNo:student.phoneNo ,
      joinedDate:student.joinedDate ,
      imagUrl:student.imagUrl,
      gender:student.gender ,
      civilStatus:student.civilStatus ,

      line1:student.address !== null ? student.address?.line1 : '',
      line2:student.address !== null ? student.address?.line2 : '',
      city: student.address !== null ?student.address?.city : '',
      province:student.address !== null ? student.address?.province : '',
      country: student.address !== null ? student.address?.country : '',
    }
    this.studentForm.setValue(setBody);
  }


  public filterQuestion(){
    this.params.batchId = this.selectedBatchId;
    this._getAllStudent();
  }

  public searchQuestions(searchText:string){
    this.searchValue.next(searchText);
  }

  public getSearchActivities(searchText:string){
    this.params.pageNumber = 1;
    this.currentPage = 1;
    this.params.searchText = searchText;
    this.params.batchId = this.selectedBatchId;
    this._getAllStudent();

  }

  //PAGINATION
  public changePerPageValue(){
    this.currentPage = 1;
    this.params.itemsPerPage = this.itemsPerPage;
    this.params.pageNumber = 1;
    if(this.itemsPerPage > 0 ){
      this._getAllStudent();
    }
  }

  public onPageChange(event:any){
    this.currentPage = event;
    this.params.pageNumber = this.currentPage;
    this._getAllStudent();
  }

}
