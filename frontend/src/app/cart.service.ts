import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cartItem } from './cartItem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Use your VM's public IP and port
  private apiUrl = 'http://20.6.75.147:8080/api/cart';

  constructor(private http: HttpClient) { }

  addToCart(productId: number, quantity: number, userId: number): Observable<cartItem> {
    return this.http.post<cartItem>(`${this.apiUrl}/add/${userId}`, { productId, quantity });
  }

  getCartItems(userId: number): Observable<cartItem[]> {
    return this.http.get<cartItem[]>(`${this.apiUrl}/${userId}`);
  }

  removeCartItem(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${cartItemId}`);
  }

  updateCartItem(cartItem: cartItem): Observable<cartItem> {
    return this.http.put<cartItem>(`${this.apiUrl}/update`, cartItem);
  }
}

