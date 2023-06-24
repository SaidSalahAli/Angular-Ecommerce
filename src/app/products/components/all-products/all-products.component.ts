import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartsService } from 'src/app/carts/services/carts.service';
import { ToastrService } from 'ngx-toastr';
import { SmoothscrollService } from 'src/app/smoothscroll.service';
import { NotificationService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: Product[] = []; // Array to store all products
  categories: string[] = []; // Array to store categories
  loading: boolean = false; // Flag to track loading state
  cartProducts: any[] = []; // Array to store cart products
  itemCount: number = 0; // Variable to track item count in the cart
  topRating: Product[] = []; // Array to store top-rated products
  laptops: Product[] = []; // Array to store laptops
  smartPhone: Product[] = []; // Array to store smartphones
  decoration: Product[] = []; // Array to store home decoration products
  @Output() itemCountChange = new EventEmitter<number>(); // Event emitter for item count changes

  constructor(
    private scrollService: SmoothscrollService,
    private service: ProductsService,
    private update: CartsService,
    private toastr: NotificationService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getTopRatedProducts();
    this.getLaptops();
    this.getSmartPhone();
    this.getDecoration();
    this.scrollService.scrollToTop();
  }

  // Update item count and emit event
  updateItemCount() {
    this.itemCount = this.cartProducts.length;
    this.itemCountChange.emit(this.itemCount);
  }

  // Get all products
  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.products = res.products;
        this.loading = false;
      },
    );
  }

  // Get top-rated products
  getTopRatedProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.topRating = res.products.filter((product: Product) => product.rating > 4.5);
        this.loading = false;
      },
    );
  }

  // Get all categories
  getCategories() {
    this.loading = true;
    this.service.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
        this.loading = false;
      },
    );
  }

  // Filter products by category
  filterCategory(event: any) {
    let value = event.target.value;
    (value == 'all') ? this.getProducts() : this.getProductsCategory(value);
  }

  // Get products by category
  getProductsCategory(keyword: string) {
    this.loading = true;
    this.service.getProductsByCategory(keyword).subscribe(
      (res: any) => {
        this.loading = false;
        this.products = res.products;
      }
    );
  }

  // Add product to cart
  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find((item: any) => item.item.id == event.item.id);
      if (exist) {
        this.toastr.showInfo('Product is already in your cart', 'Success');
        this.update.updateItemCount();
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        this.toastr.showSuccess('Product added to cart', 'Success');
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }

  // Get laptops
  getLaptops() {
    this.loading = true;
    this.service.getProductsByCategorySign('laptops').subscribe(
      (res: any) => {
        this.laptops = res.products;
        this.loading = false;
      },
    );
  }

  // Get smartphones
  getSmartPhone() {
    this.loading = true;
    this.service.getProductsByCategorySign('smartphones').subscribe(
      (res: any) => {
        this.smartPhone = res.products;
        this.loading = false;
      },
    );
  }

  // Get home decoration products
  getDecoration() {
    this.loading = true;
    this.service.getProductsByCategorySign('home-decoration').subscribe(
      (res: any) => {
        this.decoration = res.products;
        this.loading = false;
      },
    );
  }

  // Owl carousel options
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
