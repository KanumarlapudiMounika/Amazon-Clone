import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent,RegisterComponent,AdminLoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}
 
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
 
  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToadminLogin(){
    this.router.navigate(['/adminlogin']);
  }
}
