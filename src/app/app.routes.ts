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
    path: 'under-contraction',
    loadComponent: () => import('./Components/Common/under-constraction/under-constraction.component').then(m => m.UnderConstractionComponent),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./Components/not-found/not-found.component').then(m => m.NotFoundComponent),
    canActivate: [CanActiveService],
  },
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
  },
  {
    path: 'admin',
    loadChildren:()=> import('./Components/admin/business.routing.module').then(m => m.BusinessRoutingModule),
    canActivate: [CanActiveService],
  },
  {
    path: 'common',
    loadChildren:()=> import('./Components/Common/common.routing.module').then(m => m.BusinessRoutingModule),
    canActivate: [CanActiveService],
  }



];

