import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../login-in/services/user-auth.service';

// import { UserAuthService } from '../login/components/services/userAuth.service.service';
// import { UserAuthService } from '../Services/UserAuth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserAuthService , private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     if(this.authService.isUserLogged){
      return true;
     }else{
       this.router.navigate(['/login'])
      alert('You are not logged in');
      return false 
     }
  }
  
}
