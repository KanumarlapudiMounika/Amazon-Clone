import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  // Use your VM's public IP instead of localhost
  private apiUrl = 'http://20.6.75.147:8080/api/profile';

  constructor(private http: HttpClient) { }

  getProfile(email: string): Observable<any> {
    const encodedEmail = encodeURIComponent(email);
    return this.http.get(`${this.apiUrl}/${encodedEmail}`);
  }

  updateProfile(email: string, profileData: any): Observable<any> {
    const encodedEmail = encodeURIComponent(email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${encodedEmail}`, profileData, { headers });
  }
}

  
 
 
 
 
 


 
