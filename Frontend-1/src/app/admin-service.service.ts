
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User.model';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private baseUrl = 'http://localhost:8080/api/admin/users'
 
constructor(private http: HttpClient) {}
 
getAllUsers(): Observable<User[]> {
  
  return this.http.get<User[]>(`${this.baseUrl}/List`);
}

blockUser(id: number): Observable<void> {
  return this.http.put<void>(`${this.baseUrl}/block/${id}`, {});
}
UnblockUser(id: number): Observable<void> {
  return this.http.put<void>(`${this.baseUrl}/unblock/${id}`, {});
}

deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}

filterByDate(date: string): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/filter?date=${date}`);
}
}

