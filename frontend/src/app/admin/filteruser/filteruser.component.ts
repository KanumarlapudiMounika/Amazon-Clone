
import { Component } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { User } from '../../User.model';

@Component({
  selector: 'app-filteruser',
  templateUrl: './filteruser.component.html',
  styleUrls: ['./filteruser.component.css']
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
