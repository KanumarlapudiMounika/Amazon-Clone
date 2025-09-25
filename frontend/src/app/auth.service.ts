import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Your deployed backend URL
  private apiUrl = 'http://20.6.75.147:8080/api/auth';

  constructor(private http: HttpClient) { }

  // User login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/login`, credentials);
  }

// In AuthService
setUserId(userId: number) {
  localStorage.setItem('userId', userId.toString());
}

  clearUser(): void {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
  }
getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

getUserId(): number | null {
  const id = localStorage.getItem('userId');
  return id ? +id : null;
}















  // Admin login
  Adminlogin(credentials: { email: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/login`, credentials);
  }

  // User registration
  register(user: { name: string; phone: number; email: string; password: string; address: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
}

