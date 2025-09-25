import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // Use your VM's public IP and backend port
  private baseUrl = 'http://20.6.75.147:8080/orders';

  constructor(private http: HttpClient) {}

  // Get order history for logged-in user
  getOrderHistory(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history?email=${email}`);
  }

  // Reorder a previous order
  reorder(order: { email: string; amount: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/reorder`, order);
  }

  // Place a new order
  placeOrder(order: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, order);
  }
}

