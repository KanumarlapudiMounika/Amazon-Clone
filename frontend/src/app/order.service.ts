import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/orders';
 
  constructor(private http: HttpClient) {}
 
  getOrderHistory(email: string){
    return this.http.get<any[]>(`${this.baseUrl}/history?email=${email}`);
  }
 
  reorder(order: any): Observable<any> {
    const reorderRequest = {
      email: order.email,
      amount: order.amount
    };
    return this.http.post(`${this.baseUrl}/reorder`, reorderRequest);
  }
  placeOrder(order:any):Observable<any>{
    return this.http.post('http://localhost:8080/orders/orders',order);
  }
}
 