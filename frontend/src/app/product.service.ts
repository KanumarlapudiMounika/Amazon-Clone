import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Subcategory } from './Subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://20.6.75.147:8080/api/products';
  private subcategoryUrl = 'http://20.6.75.147:8080/api/subcategory';

  constructor(private http: HttpClient) { }

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Fetch subcategories by category
  fetchByCategory(category: string): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.subcategoryUrl}/${category}`);
  }

  // Get products by category
  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  // Filter products by minPrice, maxPrice, rating
  filter(minPrice?: number, maxPrice?: number, rating?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (minPrice != null) params = params.set('minPrice', minPrice);
    if (maxPrice != null) params = params.set('maxPrice', maxPrice);
    if (rating != null) params = params.set('rating', rating);

    return this.http.get<Product[]>(`${this.apiUrl}/filter`, { params });
  }

  // Get products by category and subcategory
  getProductsByCategoryAndSubcategory(category: string, subcategory: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${category}/${subcategory}`);
  }

  // Filter by price and subcategory
  filterByPriceAndSubcategory(subcategory: string, minPrice: number, maxPrice: number): Observable<Product[]> {
    const params = new HttpParams()
      .set('subcategory', subcategory)
      .set('minPrice', minPrice.toString())
      .set('maxPrice', maxPrice.toString());

    return this.http.get<Product[]>(`${this.apiUrl}/filter`, { params });
  }

  // Filter by rating and subcategory
  filterByRatingAndSubcategory(subcategory: string, rating: number): Observable<Product[]> {
    const params = new HttpParams()
      .set('subcategory', subcategory)
      .set('rating', rating.toString());

    return this.http.get<Product[]>(`${this.apiUrl}/rating`, { params });
  }

  // Search products by keyword
  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search`, {
      params: new HttpParams().set('keyword', keyword)
    });
  }

  // Get product by name
  getProductByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/name/${encodeURIComponent(name)}`);
  }

  // Get products by rating
  getProductsByRating(rating: number): Observable<Product[]> {
    const params = new HttpParams().set('rating', rating.toString());
    return this.http.get<Product[]>(`${this.apiUrl}/rating`, { params });
  }

  // Get related products excluding the current product
  getRelatedProducts(category: string, subcategory: string, excludeName: string): Observable<Product[]> {
    const params = new HttpParams()
      .set('category', category)
      .set('subcategory', subcategory)
      .set('excludeName', excludeName);

    return this.http.get<Product[]>(`${this.apiUrl}/related`, { params });
  }
}

