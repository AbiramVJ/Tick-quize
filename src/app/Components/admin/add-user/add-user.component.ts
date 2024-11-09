import { UserService } from './../../../Services/user.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppLoadingComponent } from "../../Common/under-constraction/app-loading/app-loading.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppLoadingComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {

  public users:{email:string}[] = [];

  public userForm!:FormGroup;

  public loadingIndicator:boolean = false;
  public isSubmitted:boolean = false;
  public isUpdate:boolean = false;

  constructor(private fb:FormBuilder,private userService:UserService, private toastr: ToastrService,){}

  ngOnInit(): void {
    this.userFormInit();
    this._getAllUsers();
  }

  private userFormInit(){
    this.userForm = this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }

  public _updateUser(){

  }

  public submit(){
    this.isSubmitted = true;
    if(this.userForm.valid){
      this.loadingIndicator = true;
      this.userService.createAdminUser(this.userForm.value).subscribe({
        next:()=>{

        },
        complete:()=>{
          this.loadingIndicator = false;
          this.isSubmitted = false;
          this.toastr.success('success', 'user created successfully');
          var modalElement: HTMLElement = document.getElementById('close-user')as HTMLElement;
          if(modalElement !== null){
            modalElement.click();
          }
          this.userForm.reset();
        },
        error:(error:any)=>{
          this.loadingIndicator = false;
          this.isSubmitted = false;
          this.toastr.error(error.error.Error.Title, error.error.Error.Detail);

        }
      })
    }

  }

  public _getAllUsers(){
    this.userService.getAllAdminUsers().subscribe({
      next:(res:any)=>{
        this.users = res.data;
      },
    })
  }


}
