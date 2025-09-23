import { Component } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blockuser',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './blockuser.component.html',
  styleUrl: './blockuser.component.css'
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
