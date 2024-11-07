import { Category } from './../../../../Models/category';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../Services/category.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppLoadingComponent } from "../../../Common/under-constraction/app-loading/app-loading.component";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule, AppLoadingComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {

  public categoryForm!:FormGroup;
  public loadingIndicator:boolean = false;
  public isSubmitted:boolean = false;
  public isUpdate:boolean = false;

  public pageSize:number = 5;
  public pageNumber:number = 1;
  public currentPage:number = 1;

  public catId:string = '';

  public category:Category[] =[];

  constructor(private fb:FormBuilder,
    private categoryService:CategoryService,
    private toastr: ToastrService,
  ){

  }

  ngOnInit(): void {
   this.categoryFormInit();
   this._getAllCategories();
  }

  private categoryFormInit(){
    this.categoryForm = this.fb.group({
      url:['',[Validators.required]],
      name:['',[Validators.required]],
      description:['',[Validators.required]]
    })
  }

  public submit(){
    this.isSubmitted = true;
    if(this.categoryForm.valid){
      this.loadingIndicator = true;
      const value = this.categoryForm.value;
      let body = {
        name:value.name,
        description:value.description
      }
      this.categoryService.addCategory(body).subscribe({
        next:()=>{
          this._getAllCategories();
        },
        complete:()=>{
          this.loadingIndicator = false;
          this.isSubmitted = false;
          this.toastr.success('success', 'category created successfully');
          var modalElement: HTMLElement = document.getElementById('close-cat')as HTMLElement;
          if(modalElement !== null){
            modalElement.click();
          }
          this.categoryForm.reset();
        },
        error:(error:any)=>{
          this.loadingIndicator = false;
          this.isSubmitted = false;
          this.toastr.error(error.error.Error.Title, error.error.Error.Detail);

        }
      })
    }
  }

  private _getAllCategories(){
    this.loadingIndicator = true;
    this.categoryService.getAllCategories(this.pageSize,this.pageNumber).subscribe({
      next:(res) => {
        this.category = res;
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

  public editCategory(category:Category){
    this.isUpdate = true;
    this.categoryForm.get('name')?.setValue(category.name);
    this.categoryForm.get('description')?.setValue(category.description);
    this.categoryForm.get('url')?.setValue('www.noimage.com');
    this.catId = category.id;
  }

  public _updateCategory(){
    this.isSubmitted = true;
    this.loadingIndicator = true;
    if(this.categoryForm.valid){
      this.categoryService.updateCategory(this.categoryForm.value, this.catId).subscribe({
        next:(res) => {
          this._getAllCategories();
        },
        complete:() => {
          this.loadingIndicator = false;
          this.isSubmitted = false;
          this.isUpdate = false;
          this.toastr.success('success', 'category update successfully');
          this.catId = '';
          var modalElement: HTMLElement = document.getElementById('close-cat')as HTMLElement;
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

  public _deleteCategory(){
    this.loadingIndicator = true;
    this.categoryService.deleteCategory(this.catId).subscribe({
      next:(res) => {
        this._getAllCategories();
      },
      complete:() => {
        this.loadingIndicator = false;
        this.toastr.success('success', 'category deleted successfully');
        var modalElement: HTMLElement = document.getElementById('close-delete')as HTMLElement;
        if(modalElement !== null){
          modalElement.click();
        }
        this.catId = '';
      },
      error:(error:any) => {
        this.loadingIndicator = false;
        this.toastr.error(error.error.Error.Title, error.error.Error.Detail);
      }
    })

  }

  public onPageChange(event:any){
    this.currentPage = event;
  }

}
