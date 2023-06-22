import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartsService } from 'src/app/carts/services/carts.service';
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
  constructor(private service: ProductsService ,private update: CartsService) { }
  
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getTopRatedProducts();
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
        this.update.updateItemCount();
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
  customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true


}

}