import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import  { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
 constructor(private authService: AuthService, private router: Router,private http:HttpClient) {}
 name = ''; email = ''; password = '';role='';
 login() { 
   this.authService.Adminlogin({ email: this.email, password: this.password ,role:this.role}).subscribe( 
     response => { 
      console.log("Respnse",response);
       this.authService.saveToken(response.token);
       localStorage.setItem('token', response.token);
       if (response.role === 'ADMIN') {
        this.router.navigate(['/admindashboard']);
      } else {
        alert("Access Denied: You are not an admin.");
      }
         }, 
        error =>{ console.error('Login failed', error) ;
             this.router.navigate(['/login'])
        }
     );
       
       }
}