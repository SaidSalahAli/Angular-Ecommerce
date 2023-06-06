import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  cartProducts: any[] = [];
  itemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.getCartProducts();
    this.updateItemCount();
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
  }
  
getCartItemCount(): number {
  return this.cartProducts.length;
}

  updateItemCount() {
    this.itemCount.next(this.cartProducts.length);
  }

  addToCart(product: any) {
    this.cartProducts.push(product);
 
    this.updateItemCount();
  }
}
// export class CartsService  {
//   cartProducts: any[] = [];

//   constructor() {
//     this.getCartProducts();
//   }

//   getCartProducts() {
//     if ("cart" in localStorage) {
//       this.cartProducts = JSON.parse(localStorage.getItem("cart")!);

//     }
//   }

//   getCartItemCount(): number {
//     return this.cartProducts.length;
//   }

//   addToCart(product: any) {
//     this.cartProducts.push(product);
//   }
// }


// getCartItemCount(): number {
//   return this.cartProducts.length;
// }