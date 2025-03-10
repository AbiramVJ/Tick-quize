import { Routes } from '@angular/router';
import { AuthGuardService } from '../../Services/auth-guard.service';
import { userRoleNames as role} from '../../Helpers/util'
export const BusinessRoutingModule: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./admin-home/admin-home.component').then(b => b.AdminHomeComponent),
    data: { accessUsers: [role.adminUser] }
  },
  {
    path: 'category-list',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./category/category-list/category-list.component').then(b => b.CategoryListComponent),
    data: { accessUsers: [role.adminUser] }
  },
  {
    path: 'student-list',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./Student/student-list/student-list.component').then(b => b.StudentListComponent),
    data: { accessUsers: [role.adminUser] }
  },
  {
    path: 'questions',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./questions/questions.component').then(b => b.QuestionsComponent),
    data: { accessUsers: [role.adminUser] }
  },
  {
    path: 'exam-list',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./exam/add-exam/add-exam.component').then(b => b.AddExamComponent),
    data: { accessUsers: [role.adminUser] }
  },
  {
    path: 'users',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./add-user/add-user.component').then(b => b.AddUserComponent),
    data: { accessUsers: [role.adminUser] }
  },
];
