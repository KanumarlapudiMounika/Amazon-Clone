import { Component } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deleteuser',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './deleteuser.component.html',
  styleUrl: './deleteuser.component.css'
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
