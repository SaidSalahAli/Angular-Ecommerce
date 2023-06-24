import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  // Private method to handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // Method to get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Method to get products by rating
  getProductsByRating(rating: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products/rating/${rating}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Method to get all categories
  getAllCategories(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products/categories`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Method to get products by category
  getProductsByCategory(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products/category/${keyword}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Method to get products by category using a sign
  getProductsByCategorySign(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products/category/${keyword}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Method to get product by ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.baseApi}products/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Method to get products by type
  getProductsByType(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products`, { params: { type } }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Method to search products by query
  getProductsBySearch(query: string) {
    return this.http.get<Product[]>(`${environment.baseApi}products/search`, { params: { q: query } }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
