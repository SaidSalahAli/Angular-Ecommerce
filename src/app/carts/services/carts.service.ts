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
  // Retrieves cart products from local storage (if available)
  getCartProducts() {
    if ("cart" in localStorage) {
      return this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
  }
  // Retrieves the current item count in the cart
  getCartItemCount() {
    return this.getCartProducts().length;
  }
  // Updates the item count observable with the current cart products length
  updateItemCount() {
    this.itemCount.next(this.cartProducts.length);

  }
   // Adds a product to the cart with the specified quantity
  addToCart(product: Product, quantity: number) {
    const item = {
      product: product,
      quantity: quantity
    };
    this.cartProducts.push(item);
    this.updateItemCount()
    console.log(this.getCartProducts().length)
  }
    // Removes all items from the cart
  renoveall() {
    this.cartProducts = [];
    this.updateItemCount();
    this.getCartItemCount()
  }
    // Removes a specific item from the cart based on its index
  removeFromCart(index: number) {
    this.cartProducts.splice(index, 1);
    this.updateItemCount();
    this.cartChange.next();
    this.getCartItemCount()
  }
}
