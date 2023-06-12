import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  cartProduct: any[] = [];
  itemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartChange: Subject<void> = new Subject<void>(); // إضافة حقل cartChange من نوع Subject<void>
  constructor() {
    this.getCartProducts();
    this.updateItemCount();
 
  }

  getCartProducts() {
    if ("cart" in localStorage) {
    return this.cartProduct = JSON.parse(localStorage.getItem("cart")!);
    }
  }
  getCartItemCount(): number {
    return this.cartProduct.length;
  }

  updateItemCount() {
   return this.itemCount.next(this.cartProduct.length);
  }

  addToCart(product: any) {
    this.cartProduct.push(product);
    this.updateItemCount();
    this.cartChange.next(); 
  }

  removeFromCart(index: number) {
    this.cartProduct.splice(index, 1);
    this.updateItemCount();
    this.cartChange.next();
  }
}
