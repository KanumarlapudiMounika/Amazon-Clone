import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Subcategory } from './Subcategory.model';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
private apiUrl="http://localhost:8080/api/products";
private ratingUrl="http://localhost:8080/api/products/rating";
  constructor(private http:HttpClient) { }
  getAllProducts():
    Observable<Product[]>{
  return  this.http.get<Product[]>(this.apiUrl);
}

private url="http://localhost:8080/api/subcategory";
fetchByCategory(category:string):Observable<Subcategory[]>{
  return this.http.get<Subcategory[]>(`${this.url}${category}`);
}

getByCategory(category:string):
Observable<Product[]>{
  return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
}

filter(minPrice?:number,maxPrice?:number,rating?:number):
Observable<Product[]>{
  let params = new HttpParams();
  if(minPrice != null) params=params.set('minPrice',minPrice);
  if(maxPrice != null) params=params.set('maxPrice',maxPrice);
  if(rating != null) params=params.set('rating',rating);

  return this.http.get<Product[]>(`${this.apiUrl}/filter,{params}`);
}

  getProductsByCategoryAndSubcategory(category: string, subcategory: string):Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/api/products/${category}/${subcategory}`);
    }


    filterByPriceAndSubcategory(subcategory: string, minPrice: number, maxPrice: number): Observable<Product[]> {
      let params = new HttpParams()
        .set('subcategory', subcategory)
        .set('minPrice', minPrice.toString())
        .set('maxPrice', maxPrice.toString());
   
      return this.http.get<Product[]>(`${this.apiUrl}/filter`, { params });
    }
   
    filterByRatingAndSubcategory(subcategory: string, rating: number): Observable<Product[]> {
      let params = new HttpParams()
        .set('subcategory', subcategory)
        .set('rating', rating.toString());
   
      return this.http.get<Product[]>(`${this.apiUrl}/rating`, { params });
    }





    searchProducts(keyword:string):Observable<Product[]>{
      return this.http.get<Product[]>(`http://localhost:8080/api/products/search?keyword=${keyword}`);
    }

    getProductByName(name : string):Observable<Product[]>
{
  return this.http.get<Product[]>(`http://localhost:8080/api/products/name/${encodeURIComponent(name)}`);
}



getProductsByRating(rating:number):Observable<Product[]>{
  const params=new HttpParams().set("rating",rating.toString());
  return this.http.get<Product[]>(`{this.apiUrl}/rating`,{params});
}

getRelatedProducts(category:string,subcategory:string,excludeName:string):Observable<Product[]>{
  const params=new HttpParams()
  .set('category',category)
  .set('subcategory',subcategory)
  .set('excludeName',excludeName)
  return this.http.get<Product[]>(`http://localhost:8080/api/products/related`,{params});
}


}

