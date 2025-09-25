
import { Component, OnInit } from '@angular/core';

import { User } from '../User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  
  templateUrl: './admin-dashboard.component.html',
  styleUrls:[ './admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  
  constructor(private router:Router) {}
 
  

  adminload(){
    this.router.navigate(['/adminload']);
  }
  adminblock(){
    this.router.navigate(['/adminblock']);
  }
  admindelete(){
    this.router.navigate(['/admindelete']);
  }
  adminfilter(){
    this.router.navigate(['/adminfilter']);
  }
  adminUnblock(){
    this.router.navigate(['/adminunblock']);
  }
  

}
