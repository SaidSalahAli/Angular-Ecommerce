import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartsService } from 'src/app/carts/services/carts.service';
import { Product } from 'src/app/products/models/product';
import { SmoothscrollService } from 'src/app/smoothscroll.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() data!: Product;
  @Output() addToCartClicked = new EventEmitter<any>();
  addButton: boolean = false;
  amount: number = 0;
  product!: Product;
  selectedImage!: string;
  isHovered: boolean = false;

  constructor(private cartsService: CartsService) {}

  /**
   * Changes the selected image when hovering over a different image.
   * @param imageUrl The URL of the image being hovered over.
   */
  changeImage(imageUrl: string) {
    this.isHovered = true;
    this.selectedImage = imageUrl;
  }
  
  /**
   * Adds the product to the cart and emits the addToCartClicked event.
   */
  addToCart() {
    this.cartsService.addToCart(this.data, this.amount);
    this.updateItemCount();
    this.addToCartClicked.emit({ item: this.data, quantity: this.amount });
  }
  
  /**
   * Updates the item count in the component by calling the CartsService.
   */
  updateItemCount() {
    this.amount = this.cartsService.getCartItemCount();
  }
  
  /**
   * Generates the HTML string representing the star rating based on the given rating.
   * @param rating The rating value of the product.
   * @returns The HTML string representing the star rating.
   */
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
