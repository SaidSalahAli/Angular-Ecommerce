import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartsService } from 'src/app/carts/services/carts.service';
import { ToastrService } from 'ngx-toastr';
import { SmoothscrollService } from 'src/app/smoothscroll.service';
import { NotificationService } from 'src/app/services/notification-service.service';
// import { SmoothscrollService } from '../smoothscroll.service';
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
  topRating: Product[] = [];
  laptops: Product[] = [];
  smartPhone: Product[] = [];
  decoration: Product[] = [];
  @Output() itemCountChange = new EventEmitter<number>();
  constructor(private scrollService: SmoothscrollService,
              private service: ProductsService, 
              private update: CartsService,
              private toastr :NotificationService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getTopRatedProducts();
    this.getLaptops();
    this.getSmartPhone();
    this.getDecoration();
    this.scrollService.scrollToTop();
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
        this.loading = false;
      },
    );

  }
  getTopRatedProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.topRating = res.products.filter((product: Product) => product.rating > 4.5);
        this.loading = false;

      },
    );
  }
  getCategories() {
    this.loading = true;
    this.service.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
        this.loading = false;
      },
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
        this.products = res.products;
      }
    );
  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find((item: any) => item.item.id == event.item.id);
      if (exist) {
        this.toastr.showInfo('Product is already in your cart', 'Success')
        this.update.updateItemCount();
      } else {
        this.cartProducts.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
        this.toastr.showSuccess('Product added to cart', 'Success', )
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
  }


  getLaptops() {
    this.loading = true;
    this.service.getProductsByCategorySign("laptops").subscribe(
      (res: any) => {
        this.laptops = res.products
        this.loading = false;
      },
    );
  }
  getSmartPhone() {
    this.loading = true;
    this.service.getProductsByCategorySign("smartphones").subscribe(
      (res: any) => {
        this.smartPhone = res.products
        this.loading = false;
      },
    );
  }

  getDecoration() {
    this.loading = true;
    this.service.getProductsByCategorySign("home-decoration").subscribe(
      (res: any) => {
        this.decoration = res.products
        this.loading = false;
      },
    );
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
        items: 2
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