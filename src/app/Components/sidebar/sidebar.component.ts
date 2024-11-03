import { userRoleNames } from './../../Helpers/util';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  public loginUser:any;
  public userRoles:any;
  constructor(private authService:AuthService) {}
  ngOnInit(): void {
    this.loginUser = this.authService.getUserType();
    this.userRoles = userRoleNames;
  }

  public logout(){
   // this.authService.removeItems();
  //  this.authService.setUserDetails(null);
    this.authService.logout();
  }

}
