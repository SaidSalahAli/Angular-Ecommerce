import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../login-in/services/user-auth.service';
import { NotificationService } from '../services/notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: UserAuthService,
    private router: Router,
    private toastr: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is logged in
    if (this.authService.isUserLogged) {
      return true; // User is logged in, allow access to the route
    } else {
      // User is not logged in, show error message and redirect to the login page
      this.toastr.showError('You are not logged in.', 'error');
      this.router.navigate(['/login']);
      return false; // Deny access to the route
    }
  }
}
