import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { CartsService } from 'src/app/carts/services/carts.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() data!:Product
  @Output() addToCartClicked = new EventEmitter<any>();
  addButton:boolean = false;
  amount:number = 0
  product!: Product;

  constructor(private cartsService: CartsService) { }
  ngOnInit(): void {
    console.log(this.product)
  }
  addToCart() {
    this.cartsService.addToCart(this.data, this.amount);
    this.updateItemCount();
    this.addToCartClicked.emit({ item: this.data, quantity: this.amount });
  }
  
  updateItemCount() {
    this.amount = this.cartsService.getCartItemCount();
  }
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
