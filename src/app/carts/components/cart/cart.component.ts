import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CartsService } from 'src/app/carts/services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts!: any[];
  total: number = 0;
  success: boolean = false;

  constructor(private update: CartsService) {}

  ngOnInit(): void {
    this.cartProducts = this.update.getCartProducts();
    this.getCartTotal();
    console.log(this.cartProducts);
  }

  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.updateCart();
  }

  minsAmount(index: number) {
    if (this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity--;
      this.updateCart();
    }
  }

  detectChange() {
    this.updateCart();
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.updateCart();
  }

  clearCart() {
    this.cartProducts = [];
    this.updateCart();
  }

  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  addCart() {
    let products = this.cartProducts.map(item => {
      return { productId: item.item.id, quantity: item.quantity }
    });
    this.getCartTotal();
    if(products.length === 0) {
      alert('No products found')
    // Display the success message

    }else{
      this.success = true;
    }
    
  }

  private updateCart() {
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.update.updateItemCount();
    this.getCartTotal();
  }
}
