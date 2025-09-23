import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { User } from '../../User.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-loadusers',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './loadusers.component.html',
  styleUrl: './loadusers.component.css'
})
export class LoadusersComponent implements OnInit {
  users: User[] = [];
 
  constructor(private adminService: AdminServiceService) {}
 
  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }
}
