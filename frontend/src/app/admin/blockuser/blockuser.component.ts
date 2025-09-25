import { Component } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';

@Component({
  selector: 'app-blockuser',
  templateUrl: './blockuser.component.html',
  styleUrls: ['./blockuser.component.css']
})
export class BlockuserComponent {

    /* constructor(private adminService:AdminServiceService){}
    id!: number;
 
 
 
  blockUser(): void {
    this.adminService.blockUser(this.id).subscribe(() => {
      alert(`User with ID ${this.id} blocked.`);
    });
  }
 */


  id!: number;
  constructor(private adminService:AdminServiceService){}
  blockUser(): void {
  
 
    this.adminService.blockUser(this.id).subscribe(() => {
      alert(`User with ID ${this.id} blocked.`);
    });
  }
   
   
}
