import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule,NgSelectModule, FormsModule,NgxPaginationModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent {
  items:any = [1,2,3,4,5,6];
  batch:any = [{id:1, name:'2024'}];
  selectedBatch:any;

  filterByBatch(event:any){

  }
  onPageChange(event:any){

  }

}
