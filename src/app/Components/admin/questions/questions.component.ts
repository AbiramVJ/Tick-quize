import { ExamService } from './../../../Services/exam.service';
import { Category } from './../../../Models/category';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgLabelTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { CategoryService } from '../../../Services/category.service';
import { ToastrService } from 'ngx-toastr';
import { QuestionList } from '../../../Models/examQuestions';
import { NgxPaginationModule } from 'ngx-pagination';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { AppLoadingComponent } from "../../Common/under-constraction/app-loading/app-loading.component";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormsModule, NgSelectComponent, NgxPaginationModule, AppLoadingComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent implements OnInit {
  public searchValue = new BehaviorSubject<any>(null);
  public isUpdate:boolean = false;
  public questionForms!:FormGroup;
  public isSubmitted:boolean = false;
  public loadingIndicator:boolean = false;

  public searchText:string = '';

  public selectedCatId:any;
  public cAnswer:number = 0;

  //public pageSize:number = ;
 //pagination
 public totalCount:number = 0;
 public itemsPerPage:number = 5;
 public currentPage:number = 1;

 public params = {
  itemsPerPage : this.itemsPerPage,
  pageNumber:this.currentPage,
  searchText:this.searchText,
  categoryId:null,
}
  public category:Category[] = [];
  public questions:QuestionList[] = [];

  constructor(private fb:FormBuilder,
    private categoryService:CategoryService,
    private toastr: ToastrService,
    private examService:ExamService
  ){

  }
  ngOnInit(): void {
   this.questionFormInit();
   this._getAllCategories();
   this.searchValue.pipe(debounceTime(1000)).subscribe(searchText => {
    if (searchText != null) {
      this.getSearchActivities(searchText);
    }
  });
  }


  private questionFormInit(){
    this.questionForms = this.fb.group({
      name:['',[Validators.required]],
      type:[''],
      option1:['',[Validators.required]],
      option2:['',[Validators.required]],
      option3:['',[Validators.required]],
      option4:['',[Validators.required]],
    })
  }

  public _updateQuestions(){

  }

  public submit(){
    this.isSubmitted = true;
    let body = this.prepareBody();
    if(this.questionForms.valid){
      this.examService.addQuestion(body).subscribe({
        next:(res) => {
          this.isSubmitted = false;
          this.toastr.success('success', 'question added scussfully');
        },
        complete:() => {
          this.loadingIndicator = false;
          var modalElement: HTMLElement = document.getElementById('close-ques')as HTMLElement;
          if(modalElement !== null){
            modalElement.click();
          }
          this._getAllQuestions();
        },
        error:(error:any) => {
          this.loadingIndicator = false;
          this.isSubmitted = false;
          this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
        }
      })
    }
  }

  public changeCategory(event:any){

  }

  public prepareBody(){
    const formsValue = this.questionForms.value;
    let body = {
      name : formsValue.name,
      type:1,
      categoryIds: [this.selectedCatId],
      answerOptions: [
        {
          name: formsValue.option1,
          isCorrect: this.cAnswer === 1 ? true : false,
        },
        {
          name: formsValue.option2,
          isCorrect:  this.cAnswer === 2 ? true : false,
        },
        {
          name: formsValue.option3,
          isCorrect:  this.cAnswer === 3 ? true : false,
        },
        {
          name: formsValue.option4,
          isCorrect:  this.cAnswer === 4 ? true : false,
        }
      ]

    }
    return body;
  }

  public correctAnswer(event:any){
    this.cAnswer = event;
  }

  private _getAllCategories(){
    this.loadingIndicator = true;
    this.categoryService.getAllCategoriesList().subscribe({
      next:(res) => {
        this.category = res;
        this.selectedCatId = this.category[0].id;
      },
      complete:() => {
        this.loadingIndicator = false;
        this.params = {
          itemsPerPage : this.itemsPerPage,
          pageNumber:this.currentPage,
          searchText:this.searchText,
          categoryId:this.selectedCatId,
        }
        this._getAllQuestions();

      },
      error:(error:any) => {
        this.loadingIndicator = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }

    })
  }

  private _getAllQuestions(){
    this.loadingIndicator = true;
    this.categoryService.getAllQuestions(this.params).subscribe({
      next:(res:any) => {
        this.questions = res.data;
        this.totalCount = res.totalCount;
      },
      complete:() => {
        this.loadingIndicator = false;
      },
      error:(error:any) => {
        this.loadingIndicator = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }

    })
  }

  public filterQuestion(){
    this.params.categoryId = this.selectedCatId;
    this._getAllQuestions();
  }

  public searchQuestions(searchText:string){
    this.searchValue.next(searchText);
  }

  public getSearchActivities(searchText:string){
    this.params.pageNumber = 1;
    this.currentPage = 1;
    this.params.searchText = searchText;
    this._getAllQuestions();

  }

   //PAGINATION
   public changePerPageValue(){
      this.currentPage = 1;
      this.params.itemsPerPage = this.itemsPerPage;
      this.params.pageNumber = 1;
      if(this.itemsPerPage > 0 ){
        this._getAllQuestions();
      }
  }

  public onPageChange(event:any){
    this.currentPage = event;
    this.params.pageNumber = this.currentPage;
    this._getAllQuestions();
  }

}
