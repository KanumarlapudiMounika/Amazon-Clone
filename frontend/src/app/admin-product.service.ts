import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  baseUrl='http://localhost:8080/api/admin/products';
  constructor(private http:HttpClient) { }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }
 
  addProduct(product: Product[]): Observable<Product[]> {
return this.http.post<Product[]>(this.baseUrl, product);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
   
  updateProduct(product: Product[]): Observable<Product[]> {
    return this.http.put<Product[]>(`${this.baseUrl}/updateByDetails`, product);
  }

}
