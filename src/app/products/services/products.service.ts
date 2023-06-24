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
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getProductsByRating(rating: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products/rating/${rating}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getAllCategories(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products/categories`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getProductsByCategory(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products/category/${keyword}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  getProductsByCategorySign(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products/category/${keyword}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.baseApi}products/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getProductsByType(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseApi}products`, { params: { type } }).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getProductsBySearch(query: string) {
    return this.http.get<Product[]>(`${environment.baseApi}products/search`, { params: { q: query } }).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
