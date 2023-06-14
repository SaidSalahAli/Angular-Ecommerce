import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CartsService } from 'src/app/carts/services/carts.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  id: any
  data: any = []
  loading: boolean = false
  amount: number = 0
  constructor(private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private service: ProductsService,
              private cartService: CartsService) {
    this.id = this.route.snapshot.paramMap.get("id")

  }

  ngOnInit(): void {
    this.getProduct()
  }
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
  getProduct() {
    this.loading = true
    this.service.getProductById(this.id).subscribe(res => {
      this.loading = false
      this.data = res
    }, error => {
      this.loading = false
      alert(error)
    })

  }
  addAmount() {
    this.amount++;
  }

  minsAmount() {
    if (this.amount > 1) {
      this.amount--;
    }
  } 


  // detectChange() {
  //   this.cartService.updateItemCount()
  // }
  
  addToCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")!) || [];
    const existingItem = cartItems.find((item: any) => item.item.id === this.data.id);
    
    if (existingItem) {
      console.log("Product already exists in cart");
      alert("Product already exists in cart"); // Display a message indicating that the product already exists in the cart
    } else {
      cartItems.push({ item: this.data, quantity: this.amount });
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cartService.addToCart(this.data, this.amount); // Pass the quantity to the addToCart() function
      console.log("Product added to cart");
      alert("Product added to cart"); // Display a message indicating that the product has been added to the cart
    }
  }
  
}
