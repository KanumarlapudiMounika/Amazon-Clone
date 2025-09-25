import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { User } from '../../User.model';
@Component({
  selector: 'app-loadusers',
  
  templateUrl: './loadusers.component.html',
  styleUrls: ['./loadusers.component.css']
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
