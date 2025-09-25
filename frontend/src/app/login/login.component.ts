import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        // Save user info in localStorage
        localStorage.setItem('user', JSON.stringify(response.user));

        // Navigate to dashboard
        this.router.navigate(['dashboard']);
      },
      error => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.');
        this.router.navigate(['/login']);
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }
}

