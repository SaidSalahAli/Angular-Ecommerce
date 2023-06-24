import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from 'src/app/products/models/product';
@Injectable({
  providedIn: 'root'
})
export class CartsService {
  cartProducts: any[] = [];
  itemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartChange: Subject<void> = new Subject<void>();

  constructor() {
    this.getCartProducts();
    this.updateItemCount();
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      return this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
  }


  getCartItemCount() {
    return this.getCartProducts().length;
  }

  updateItemCount() {
    this.itemCount.next(this.cartProducts.length);

  }
  addToCart(product: Product, quantity: number) {
    const item = {
      product: product,
      quantity: quantity
    };
    this.cartProducts.push(item);
    this.updateItemCount()
    console.log(this.getCartProducts().length)
  }
  renoveall() {
    this.cartProducts = [];
    this.updateItemCount();
    this.getCartItemCount()
  }
  removeFromCart(index: number) {
    this.cartProducts.splice(index, 1);
    this.updateItemCount();
    this.cartChange.next();
    this.getCartItemCount()
  }
}
