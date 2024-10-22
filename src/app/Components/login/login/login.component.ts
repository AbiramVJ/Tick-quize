import { Component, OnInit } from '@angular/core';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgSelectComponent,NgLabelTemplateDirective,NgOptionTemplateDirective,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public selectedRole:any;
  public selectedRoleId:number = 0;
  public role:any = [{id:1, name:"Student"},{id:0, name:"Admin"}];
  public loginForm!:FormGroup;

  constructor(private authService:AuthService, private fb:FormBuilder, private route:Router){

  }

  ngOnInit(){
    this.logInFromInit();
  }

  private logInFromInit(){
    this.loginForm = this.fb.group({
      studentId:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  public login(){
    const body = {
        identifier: this.loginForm.get('studentId')?.value,
        identifierType: this.selectedRoleId,
        password: this.loginForm.get('password')?.value,
        role: this.selectedRole,
    }

    if(this.loginForm.valid){
      this.authService.logIn(body).subscribe({
        next:(res:any)=>{
          localStorage.setItem('token', res.Result.token);
        },
        complete:()=>{
          this.route.navigate(['student-home']);
        },
        error(error:any){

        }
      })
    }
  }

  public changeRole(event:any){
    this.selectedRole = event.name;
    this.selectedRoleId = event.id;
  }

}
