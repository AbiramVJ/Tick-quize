import { ToastrService } from 'ngx-toastr';
import { ExamService } from './../../../../Services/exam.service';
import { Component, OnInit } from '@angular/core';
import { Exam } from '../../../../Models/exam';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../Services/category.service';
import { Category } from '../../../../Models/category';
import { AppLoadingComponent } from "../../../Common/under-constraction/app-loading/app-loading.component";

@Component({
  selector: 'app-add-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppLoadingComponent],
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.scss'
})
export class AddExamComponent implements OnInit {

  public pageSize:number = 5;
  public pageNumber:number = 1;
  public currentPage:number = 1;
  public step:number = 1;
  public completePercentage:number = 0;

  public loadingIndicator:boolean = false;
  public isSubmitted:boolean = false;
  public isUpdate:boolean = false;
  public isExamCreated:boolean = false;
  public isEditFlow:boolean = false;

  public examId:string = '';
  public deleteId:string = '';

  public examForm!:FormGroup;

  public exam:Exam[] = [];
  public categories:Category[] = [];
  public selectedCategory:any [] = [];
  public categoryWithQuestions:any [] = [];
  public assignQuestionsIds:any[] = [];

  constructor(private examService:ExamService,
    private toastr: ToastrService,
    private categoryService:CategoryService,
    private fb:FormBuilder,

  ){

  }
  ngOnInit(): void {
    this._getAllExam();
    this.examFormsInit();
  }

  private examFormsInit(){
    this.examForm = this.fb.group({
      imageUrl: ['', Validators.required],
      name: ['', Validators.required],
      isActive: [false],
      questionType: [1, Validators.required],
      date: ['', Validators.required],
      duration: [15, [Validators.required, Validators.min(0)]]
    });
  }

  private _getAllExam(){
    this.examService.getAllExam(this.pageSize, this.pageNumber).subscribe({
      next:(res:any)=>{
        this.exam = res;
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

  private _getAllCategories(){
    this.categoryService.getAllCategoriesList().subscribe({
      next:(res) => {
        this.categories = res;
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

  public addExam(){
    this._getAllCategories()
  }

  public changeStep(step:number){
    if(step === 1 ){
     this.step = 1;
     this.completePercentage = 0;
    }else if(step === 2){
     if(this.isEditFlow){
      if(this.examForm.touched){
        this._editExam()
      }else{
        this.step = 2;
        this.completePercentage = 30;
        this.assignQuestionsIds = [];
        this.categoryWithQuestions = [];
        this._getAllExam();
        this._getAssignCategory();
      }
     }else{
      this._createExam();
     }
    }else if(step === 3){
      this._assignCategoryToQuestion();
    }else if(step = 4){
     let isValid =  this.categoryWithQuestions.some((cat:any) => cat.selectedCount < cat.questionCount );
     if(!isValid){
      this._completeExamCreation();
     }else{
      this.toastr.warning('some of questions are not added please check','Warring!');
     }
    }
  }


  //SELECT CATEGORY LOGIC
  public selectCategory(category:any){
    category['questionCount'] = 0;
    const isAdded: boolean = this.selectedCategory.some((cat: any) => cat.id === category.id);
    if(!isAdded){
      this.selectedCategory.push(category);
    }else{
      this.selectedCategory = this.selectedCategory.filter((cat: any) => cat.id !== category.id);
    }
  }

  public setEditFormsValue(exam:any){
    this.completePercentage = 0;
    this._getAllCategories()
    this.examId = exam.id;
    this.isEditFlow = true;
    delete exam['id'];
    let setDetails = exam;
    this.examForm.setValue(setDetails);
  }


  // API CALLS : ADD QUESTION STEP - 1
  private _createExam(){
    this.isSubmitted = true;
    if(this.examForm.valid){
      if(!this.isExamCreated){
        this.loadingIndicator = true;
        this.examService.addExam(this.examForm.value).subscribe({
          next:(res) => {
            this.isExamCreated = true;
            this.examId = res.Result.id;
            this.toastr.success('success', 'Exam created successfully');
          },
          complete:() => {
            this.loadingIndicator = false;
            this.isSubmitted = false;
            this.step = 2;
            this.completePercentage = 60;
          },
          error:(error:any) => {
            this.loadingIndicator = false;
            this.isSubmitted = false;
            this.isExamCreated = false;
            this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
          }
        })
      }else{
        this.step = 2;
        this.completePercentage = 60;
        if(this.examForm.touched){
          this._editExam();
        }
      }

    }
  }

  private _editExam(){
    this.isSubmitted = true;
    this.loadingIndicator = true;
    const body = this.examForm.value;
    this.examService.editExam(this.examForm.value, this.examId).subscribe({
      next:(res) => {

      },
      complete:() => {
        this.loadingIndicator = false;
        this.isSubmitted = false;
        this.step = 2;
        this.completePercentage = 30;
        this._getAllExam();
        this._getAssignCategory();
      },
      error:(error:any) => {
        this.loadingIndicator = false;
        this.isSubmitted = false;
      //  this.isExamCreated = false;

        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }
    })

  }

  // API CALLS : ASSIGN CATEGORY COUNT FOR EXAM- 2
  private _assignCategoryToQuestion(){
    this.isSubmitted = true;
    const isValidBody = this.selectedCategory.some((c: any) => c.questionCount === 0 || c.questionCount === null);
    if(!isValidBody && this.selectedCategory.length > 0  ){
      this.loadingIndicator = true;
      const body = this.selectedCategory.map((c:any) => {
        return {
          categoryId : c.id,
          questionCount : c.questionCount,
        }
      })
      this.examService.addQuestionToCategory(body, this.examId).subscribe({
        next:(res) => {
         // this.toastr.success('success', 'Categories assigned successfully');
        },
        complete:() => {
          this.loadingIndicator = false;
          this.isSubmitted = false;
          this.step = 3;
          this.completePercentage = 60;
          this.getAllCategoryWithAnswer();
        },
        error:(error:any) => {
          this.loadingIndicator = false;
          this.isSubmitted = false;
          this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
        }
      })
    }

  }

  private _getAssignCategory(){
    this.examService.getAssignCategory(this.examId).subscribe({
      next:(res:any) =>{
        this.selectedCategory = res;
        this.selectedCategory.forEach(sc => {
          const category = this.categories.find(cat => cat.id === sc.id);
          if (category) {
              category.isChecked = true;
          }
      });
      },
      complete:()=>{

      },
      error:(error:any) => {
        this.loadingIndicator = false;
        this.isSubmitted = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }
    })
  }

  public deleteExam(){
    this.loadingIndicator = true;
    this.examService.deleteExam(this.deleteId).subscribe({
      next:(res:any) => {
       this.toastr.success('success', 'Categories deleted successfully');
      },
      complete:()=>{
        this.loadingIndicator = false;
        var modalElement: HTMLElement = document.getElementById('close-delete')as HTMLElement;
        if(modalElement !== null){
          modalElement.click();
        }
        this._getAllExam();
      },
      error:(error:any) => {
        this.loadingIndicator = false;
        this.isSubmitted = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }
    })
  }

  public closeModelProperties(){
    this.isSubmitted = false;
    this.loadingIndicator = false;
    this.isExamCreated = false;
    this.selectedCategory = [];
    this.step = 1;
    this.completePercentage = 30;
  }


  public getAllCategoryWithAnswer(){
    this.examService.getAssignCategory(this.examId).subscribe({
      next:(res:any) =>{
        let preparedArray = res.map((cat: any) => {
          cat.selectedCount = 0;
          cat.questions.forEach((q: any) => {
              if (q.isAlreadyAdded) {
                this.assignQuestionsIds.push(q.id);
                  cat.selectedCount += 1;
              }
          });
          return cat;
      });
        this.categoryWithQuestions = preparedArray;
      },
      complete:()=>{

      },
      error:(error:any) => {
        this.loadingIndicator = false;
        this.isSubmitted = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }
    })
  }

  public assignQuestions(q: any, id: string) {

    if (!this.assignQuestionsIds.includes(id)) {
      this.assignQuestionsIds.push(id);
    } else {
      this.assignQuestionsIds = this.assignQuestionsIds.filter(item => item !== id);
    }
    this.categoryWithQuestions.forEach((cat: any) => {
      if (cat.id === q.id) {
        const question = cat.questions.find((question: any) => question.id === id);
        if (question) {
          if (this.assignQuestionsIds.includes(id)) {
            cat.selectedCount += 1;
          } else {
            cat.selectedCount -= 1;
          }
        }
      }
    });

    console.log(this.assignQuestionsIds);
}

  public _completeExamCreation(){
    this.loadingIndicator = true;
    this.examService.completeExamCreation(this.assignQuestionsIds,this.examId).subscribe({
      next:()=>{
        this.toastr.success('Exam created successfully','success');
      },
      complete:()=>{
        this.loadingIndicator = false;
        var modalElement: HTMLElement = document.getElementById('close-cat')as HTMLElement;
        if(modalElement !== null){
          modalElement.click();
        }
        this.closeModelProperties();
      },
      error:(error:any) => {
        this.loadingIndicator = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }

    })
  }

}
