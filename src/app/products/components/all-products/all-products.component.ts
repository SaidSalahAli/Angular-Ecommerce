import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];
  itemCount: number = 0;
  topRating: Product [] =[]
  @Output() itemCountChange = new EventEmitter<number>();
  constructor(private service: ProductsService) { }
  
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getTopRatedProducts();
    console.log(this.topRating)
    console.log(this.products)
  }
  updateItemCount() {
    this.itemCount = this.cartProducts.length;
    this.itemCountChange.emit(this.itemCount);
  }

  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.products = res.products;
        console.log(this.products)
        this.loading = false;
      },
      error => {
        this.loading = false;
        alert(error);
      }
    );

  }
  getTopRatedProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.topRating = res.products.filter((product: Product) => product.rating > 4.5);
        this.loading = false;
  
      },
      error => {
        this.loading = false;
        alert(error);
      }
    );
  }
  getCategories() {
    this.loading = true;
    this.service.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
        this.loading = false;
      },
      error => {
        this.loading = false;
        alert(error);
      }
    );
  }

  filterCategory(event: any) {
    let value = event.target.value;
    (value == "all") ? this.getProducts() : this.getProductsCategory(value);
  }

  getProductsCategory(keyword: string) {
    this.loading = true;
    this.service.getProductsByCategory(keyword).subscribe(
      (res: any) => {
        this.loading = false;
        console.log(this.categories)
        this.products = res.products;
      }
    );
  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find((item: any) => item.item.id == event.item.id);
      if (exist) {
        alert("Product is already in your cart");
      } else {
        this.cartProducts.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
  }
  navigateToPrevious() {
    setTimeout(() => {
      // انفذ التنقل إلى المنتج السابق
    }, 1000);
  }
  
  navigateToNext() {
    setTimeout(() => {
      // انفذ التنقل إلى المنتج التالي
    }, 1000);
  }
  
}
