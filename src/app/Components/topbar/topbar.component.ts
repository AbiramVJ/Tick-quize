import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {

  public index:any;
  constructor(private authService:AuthService){

  }

  ngOnInit(): void {
    this.index = this.authService.getIndex();
  }

}
