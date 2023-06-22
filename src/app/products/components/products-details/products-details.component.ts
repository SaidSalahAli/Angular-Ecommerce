import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CartsService } from 'src/app/carts/services/carts.service';
import { ToastrService } from 'ngx-toastr';

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
  selectedImage: string | undefined;

  constructor(private route: ActivatedRoute,
    private service: ProductsService,
    private cartService: CartsService,
    private toastr: ToastrService) {
    this.id = this.route.snapshot.paramMap.get("id")

  }
  selectImage(image: string) {
    this.selectedImage = image;
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
      this.toastr.success('Product is already in your cart', 'Success', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    } else {
      cartItems.push({ item: this.data, quantity: this.amount });
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cartService.addToCart(this.data, this.amount); // Pass the quantity to the addToCart() function
      this.toastr.success('Product added to cart', 'Success', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });// Display a message indicating that the product has been added to the cart
    }
  }
  
}
