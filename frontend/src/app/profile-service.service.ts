import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private apiUrl = 'http://localhost:8080/api/profile';
 // private apiUrl1='http://localhost:8080/api/auth/profile';
  constructor(private http: HttpClient) { }

  getProfile(email: string): Observable<any> {
  const encodedEmail= encodeURIComponent(email);
    return this.http.get(`${this.apiUrl}/${encodedEmail}`);
  }

 updateProfile(email: string, profileData: any): Observable<any> {
            const encodedEmail = encodeURIComponent(email);
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
         
            return this.http.put(`${this.apiUrl}/${encodedEmail}`, profileData, { headers });
          }
}



  
 
 
 
 
 


 
