import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login/login.component';
import { Component } from '@angular/core';
import { StudentHomeComponent } from './Components/Home/student-home/student-home.component';
import { DeActiveService } from './Services/de-active.service';
import { userRoleNames as role } from './Helpers/util';
import { CanActiveService } from './Services/can-active.service';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./Components/login/login/login.component').then(m => m.LoginComponent),
    canActivate: [DeActiveService],data: { accessUsers: [role.studentUser,role.adminUser] }
  },
  {
    path: 'student-home',
    loadComponent: () => import('./Components/Home/student-home/student-home.component').then(m => m.StudentHomeComponent),
    canActivate: [CanActiveService],
    data: { accessUsers: [role.studentUser] }
  },
  {
    path: 'exam/:id',
    loadComponent: () => import('./Components/exams/exams.component').then(m => m.ExamsComponent),
    canActivate: [CanActiveService],
    data: { accessUsers: [role.studentUser] }
  }
];

