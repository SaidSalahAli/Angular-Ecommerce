import { Component } from '@angular/core';
import { Product } from 'src/app/products/models/product';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-searsh',
  templateUrl: './searsh.component.html',
  styleUrls: ['./searsh.component.scss']
})
export class SearshComponent {  
  searchQuery: string = '';
  searchProduct: Product[] = [];

  constructor(private productService: ProductsService) {}

  onSearchQueryChange() {
    this.getProductSearch();
  }

  getProductSearch() {
    if(this.searchQuery === ''){
      this.searchProduct = []
    }else{
    this.productService.getProductsBySearch(this.searchQuery).subscribe(
      (res: any) => {
        this.searchProduct = res.products;
      },
      error => {
        alert(error);
      }
    );
    }
  }

  filterProducts() {
    if (this.searchQuery.trim() === '') {
      this.searchProduct = [];
    } else {
      this.searchProduct = this.searchProduct.filter(product => {
        return product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  }

  addToCart(event: Product) {
    if ('cart' in localStorage) {
      const cartItems: Product[] = JSON.parse(localStorage.getItem('cart')!);
      const exist = cartItems.find(item => item.id === event.id);
      if (exist) {
        alert('Product is already in your cart');
      } else {
        cartItems.push(event);
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
    } else {
      const cartItems: Product[] = [event];
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }
}
