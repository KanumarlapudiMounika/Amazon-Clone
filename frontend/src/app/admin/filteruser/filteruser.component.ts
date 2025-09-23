import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { User } from '../../User.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-filteruser',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filteruser.component.html',
  styleUrl: './filteruser.component.css'
})
export class FilteruserComponent {
  constructor(private adminService:AdminServiceService){}
  filterDate: string = '';
  users: User[] = [];
  filterByDate(): void {
    this.adminService.filterByDate(this.filterDate).subscribe(data => {
      this.users = data;
    });
  }
}
