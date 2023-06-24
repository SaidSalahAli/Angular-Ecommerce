import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CartsService } from 'src/app/carts/services/carts.service';
import { SmoothscrollService } from 'src/app/smoothscroll.service';
import { NotificationService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  data: any = [];
  loading: boolean = false;
  amount: number = 0;
  selectedImage: string | undefined;

  imageSize = 430;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private cartService: CartsService,
    private toastr: NotificationService,
    private scrollService: SmoothscrollService,
    private cdr: ChangeDetectorRef
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
  }

  // Function to select the image for display
  selectImage(image: string) {
    this.selectedImage = image;
  }

  ngOnInit(): void {
    this.getProduct();
    this.scrollService.scrollToTop();
  }

  // Function to get the star rating HTML based on the rating value
  getStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    let starRating = '';

    for (let i = 0; i < fullStars; i++) {
      starRating += '<span class="fas fa-star"></span>';
    }

    if (hasHalfStar) {
      starRating += '<span class="fas fa-star-half-alt"></span>';
    }

    return starRating;
  }

  // Function to fetch the product details
  getProduct() {
    this.loading = true;
    this.service.getProductById(this.id).subscribe(
      (res) => {
        this.loading = false;
        this.data = res;
        this.cdr.detectChanges(); // Trigger change detection after receiving product data
      },
      (error) => {
        this.loading = false;
        alert(error);
      }
    );
  }

  // Function to increase the product quantity
  addAmount() {
    this.amount++;
  }

  // Function to decrease the product quantity, with a minimum value of 1
  minsAmount() {
    if (this.amount > 1) {
      this.amount--;
    }
  }

  // Function to add the product to the cart
  addToCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")!) || [];
    const existingItem = cartItems.find((item: any) => item.item.id === this.data.id);

    if (existingItem) {
      this.toastr.showInfo('Product is already in your cart', 'Success');
    } else {
      cartItems.push({ item: this.data, quantity: this.amount });
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cartService.addToCart(this.data, this.amount); // Pass the quantity to the addToCart() function
      this.toastr.showSuccess('Product added to cart', 'Success');
    }
  }
}
