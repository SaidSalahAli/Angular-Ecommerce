import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/carts/services/carts.service';
import { UserAuthService } from 'src/app/login-in/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  itemCount: number = 0;
  constructor(private cartsService: CartsService, private authService: UserAuthService, private cdr: ChangeDetectorRef) {}

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

  get islogined(): boolean {
    return this.authService.isUserLogged;
  }

  logout(): void {
    // Perform logout logic
    this.authService.logout();
    this.cdr.detectChanges(); // Manually trigger change detection
  }
}
