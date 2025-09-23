import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';


interface JwtPayload {
  id?: number;
  sub?: string;
  email?: string;
}


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  getUserId(): number {
    const userStr=localStorage.getItem('user');
    if(!userStr) return 0;
    try{
      const user=JSON.parse(userStr);
      return user?.id ||0;
    }
    catch{
      return 0;
    }
  }
  getToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token); // This is correct
  }

  getUserEmail():string{
    const userStr=localStorage.getItem('user');
    if(userStr){
      try{
        const user=JSON.parse(userStr);
        return user?.email || '';
      }
      catch(e){
        return '';
      }
    }
    return '' ;
  }
 




  

  /* getToken(): string | null {
    return localStorage.getItem('jwtToken');
  } */

        private apiUrl = 'http://localhost:8080/api/auth';
 
constructor(private http: HttpClient) { }


login(credentials: { email: string; password: string }): Observable<any> {
   return this.http.post<any>(`${this.apiUrl}/admin/login`, credentials);
   }
  

  Adminlogin(credentials: { email: string; password: string ;role :string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/login`, credentials);
    }
    saveAdToken(token: string): void {
     localStorage.setItem('jwtToken', token);
   }
   isAuthenticated(): boolean {
    return !!this.getToken();
  }
 
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  }

   register(user: { name:string;phone:number;email: string; password: string;address:String }): Observable<any> { 
    return this.http.post<any>(`${this.apiUrl}/register`, user);
   }







/* 
  adminlogin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/login`, credentials);
    }
    saveAdminToken(token: string): void {
     localStorage.setItem('jwtToken', token);
   } */
  
 
  
}
