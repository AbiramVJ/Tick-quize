import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private authService:AuthService) {}

  public logout(){
   // this.authService.removeItems();
  //  this.authService.setUserDetails(null);
    this.authService.logout();
  }

}
