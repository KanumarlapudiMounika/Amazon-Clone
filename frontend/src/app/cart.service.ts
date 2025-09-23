import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cartItem } from './cartItem.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';
  constructor(private http:HttpClient) { }

  
  addToCart(productId: number, quantity: number, userId: number): Observable<cartItem> {
    return this.http.post<cartItem>(`${this.apiUrl}/add/${userId}`, { productId, quantity });
      }
     
      getCartItems(userId: number): Observable<cartItem[]> {
        return this.http.get<cartItem[]>(`${this.apiUrl}/${userId}`);
      }
     
      removeCartItem(cartItemId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/remove/${cartItemId}`);
      }

      updateCartItem(cartItem: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/cart/update`, cartItem);
      }
}
