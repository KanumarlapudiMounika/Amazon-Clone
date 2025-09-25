import { Component } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent {
constructor(private adminService:AdminServiceService){}
id!: number;
 


deleteUser(): void {
  this.adminService.deleteUser(this.id).subscribe(() => {
    alert(`User with ID ${this.id} deleted.`);
  });
}
}
