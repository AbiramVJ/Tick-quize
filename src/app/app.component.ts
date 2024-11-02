import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./Components/sidebar/sidebar.component";
import { TopbarComponent } from "./Components/topbar/topbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public isLogIn:boolean = false;

  constructor(private authService:AuthService){
    this.getUserDetails();
  }
  ngOnInit(){
    if(this.authService.getUserType()){
      this.isLogIn = true;
    }else{
      this.isLogIn = false;
    }
    this.authService.logoutEvent.subscribe(() => {
      this.isLogIn = false;
    });
  }

  private getUserDetails(){
    this.authService.user$.subscribe((user:any)=>{
      user !== null ? this.isLogIn = true : false;
    })
  }

}
