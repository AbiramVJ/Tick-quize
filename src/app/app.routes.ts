import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login/login.component';
import { Component } from '@angular/core';
import { StudentHomeComponent } from './Components/Home/student-home/student-home.component';


export const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'student-home', component:StudentHomeComponent},
];
