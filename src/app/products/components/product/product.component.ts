import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { CartsService } from 'src/app/carts/services/carts.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() data!: Product; // Input property to receive product data from parent component
  @Output() addToCartClicked = new EventEmitter<any>(); // Event emitter for add to cart action
  addButton: boolean = false;
  amount: number = 0;
  product!: Product;
  selectedImage!: string;
  isHovered: boolean = false;

  constructor(private cartsService: CartsService) {}

  ngOnInit(): void {}

  // Change the displayed image when hovered
  changeImage(imageUrl: string) {
    this.isHovered = true;
    this.selectedImage = imageUrl;
  }

  // Add product to cart
  addToCart() {
    this.cartsService.addToCart(this.data, this.amount);
    this.updateItemCount();
    this.addToCartClicked.emit({ item: this.data, quantity: this.amount });
  }

  // Update the item count in the cart
  updateItemCount() {
    this.amount = this.cartsService.getCartItemCount();
  }

  // Get star rating HTML representation
  getStarRating(rating: number) {
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
}
