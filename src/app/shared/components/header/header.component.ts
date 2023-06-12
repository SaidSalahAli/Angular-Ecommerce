import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/carts/services/carts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  itemCount: number = 0;
  constructor(private cartsService: CartsService) { }
 
  ngOnInit(): void {
    this.cartsService.itemCount.subscribe({
      next: (count) => {
        this.itemCount = count;
      }
    });

    this.cartsService.cartChange.subscribe(() => {
      this.itemCount = this.cartsService.getCartItemCount();
    });

}
}