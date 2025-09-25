import { Component } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';


@Component({
  selector: 'app-un-block-user',
  templateUrl: './un-block-user.component.html',
  styleUrls: ['./un-block-user.component.css']
})
export class UnBlockUserComponent {
  id!: number;
  constructor(private adminService:AdminServiceService){}
  UnblockUser(): void {
  
 
    this.adminService.UnblockUser(this.id).subscribe(() => {
      alert(`User with ID ${this.id} Unblocked.`);
    });
  }
   
}
