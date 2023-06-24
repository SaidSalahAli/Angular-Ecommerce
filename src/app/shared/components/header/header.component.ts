import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/carts/services/carts.service';
import { UserAuthService } from 'src/app/login-in/services/user-auth.service';
import { SmoothscrollService } from 'src/app/smoothscroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  itemCount: number = 0;
  isMenuOpen: boolean = false;

  constructor(private smoothScrollService: SmoothscrollService, private cartsService: CartsService, private authService: UserAuthService, private cdr: ChangeDetectorRef) {}

  /**
   * Scrolls to the top of the page using the smooth scroll service.
   */
  scrollToTop(): void {
    this.smoothScrollService.scrollToTop();
  }

  ngOnInit(): void {
    // Subscribe to the itemCount observable to update the itemCount property
    this.cartsService.itemCount.subscribe({
      next: (count) => {
        this.itemCount = count;
      }
    });

    // Subscribe to the cartChange event to update the itemCount property
    this.cartsService.cartChange.subscribe(() => {
      this.itemCount = this.cartsService.getCartItemCount();
    });
  }

  /**
   * Closes the menu by setting isMenuOpen to false.
   */
  closeMenu() {
    this.isMenuOpen = false;
  }

  /**
   * Returns whether the user is logged in.
   * @returns True if the user is logged in, false otherwise.
   */
  get isLoggedin(): boolean {
    return this.authService.isUserLogged;
  }

  /**
   * Toggles the value of isMenuOpen.
   */
  isMenuOpenn() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Performs the logout logic.
   * Triggers manual change detection to update the view.
   */
  logout(): void {
    this.authService.logout();
    this.cdr.detectChanges();
  }
}
