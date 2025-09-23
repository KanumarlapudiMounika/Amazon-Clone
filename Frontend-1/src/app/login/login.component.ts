import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,DashboardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router,private http:HttpClient) {}

        name = ''; email = ''; password = '';
        login() { 
          this.authService.login({ email: this.email, password: this.password }).subscribe( 
            response => { 
              this.authService.saveToken(response.token);
              /*  localStorage.setItem('token', response.token); */
               localStorage.setItem('user',JSON.stringify(response.user)); 
               this.router.navigate(['dashboard']); }, 
               error =>{ console.error('Login failed', error) ;
                    this.router.navigate(['/login'])
               }
            );
              
              }
              register(){
                this.router.navigate(['/register']);
              
  } 
}

