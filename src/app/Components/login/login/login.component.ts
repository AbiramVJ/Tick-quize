import { Component, OnInit } from '@angular/core';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgSelectComponent,NgLabelTemplateDirective,NgOptionTemplateDirective,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public selectedRole:string = '';
  public selectedRoleId:number = 1;
  public role:any = [{id:1, name:"Student"},{id:2024, name:"QWAdmin"}];
  public loginForm!:FormGroup;

  public isSubmitted:boolean = false;
  public loadingIndicator:boolean = false;



  constructor(private authService:AuthService, private fb:FormBuilder, private route:Router,private toastr: ToastrService){

  }

  ngOnInit(){
    this.selectedRole = this.role[0].name;
    this.logInFromInit();
    localStorage.removeItem('token');
    localStorage.removeItem('login-type');
    this.authService.setUserDetails(null);

  }

  private logInFromInit(){
    this.loginForm = this.fb.group({
      studentId:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  public login(){
    this.loadingIndicator = true;
    this.isSubmitted = true;
    const body = {
        identifier: this.loginForm.get('studentId')?.value,
        identifierType: this.selectedRoleId,
        password: this.loginForm.get('password')?.value,
        role: 'Student',
    }
    if(this.loginForm.valid){
      this.authService.logIn(body).subscribe({
        next:(res:any)=>{
          localStorage.setItem('token', res.Result.token);
        },
        complete:()=>{
          this.isSubmitted = false;
          this.loadingIndicator = false;
          localStorage.setItem('login-type', this.selectedRole);
          localStorage.setItem('index', this.loginForm.get('studentId')?.value);
          this.authService.setUserDetails(this.selectedRole);
          this.route.navigate(['student-home']);

        },
        error:(error:any)=>{
          this.isSubmitted = false;
          this.loadingIndicator = false;
          this.toastr.error('User name or password is incorrect','Error');
        }
      })
    }
  }

  public adminLogin(){
    this.loadingIndicator = true;
    this.isSubmitted = true;
    const body = {
        identifier: this.loginForm.get('studentId')?.value,
        identifierType: this.selectedRoleId,
        password: this.loginForm.get('password')?.value,
        role: this.selectedRoleId !== 1 ? 'QWAdmin' : null,
    }

  //  console.log(body)

    if(this.loginForm.valid){
      this.authService.adminLogin(body).subscribe({
        next:(res:any)=>{
          localStorage.setItem('token', res.Result.token);
        },
        complete:()=>{
          this.isSubmitted = false;
          this.loadingIndicator = false;
          const role:any = this.selectedRoleId !== 1 ? 'QWAdmin' : null;
          localStorage.setItem('login-type', role);
          localStorage.setItem('index','QWAdmin');
          this.authService.setUserDetails(this.selectedRole);
          this.route.navigate(['admin/home']);
        },
        error:(error:any)=>{
          this.isSubmitted = false;
          this.loadingIndicator = false;
          this.toastr.error('User name or password is incorrect','Error');
        }
      })
    }

  }

  public changeRole(event:any){
    this.selectedRole = event.name;
  }

}
