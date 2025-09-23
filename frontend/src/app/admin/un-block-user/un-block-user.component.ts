import { Component } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-un-block-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './un-block-user.component.html',
  styleUrl: './un-block-user.component.css'
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
