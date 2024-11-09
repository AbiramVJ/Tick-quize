import { Routes } from '@angular/router';
import { AuthGuardService } from '../../Services/auth-guard.service';
import { userRoleNames as role} from '../../Helpers/util'


export const BusinessRoutingModule: Routes = [
  {
    path: 'result',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./result/result.component').then(b => b.ResultComponent),
    data: { accessUsers: [role.adminUser, role.studentUser] }
  },
]
