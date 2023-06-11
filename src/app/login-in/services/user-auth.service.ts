import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private isUserLoggedd: boolean = false;
  
  constructor() {
    this.isUserLoggedd = localStorage.getItem('isUserLogged') === 'true';
  }

  login() {
    // Perform login logic
    // Update user logged status in localStorage
    localStorage.setItem('isUserLogged', 'true');
    this.isUserLoggedd = true;
  }


  get isUserLogged() {
    return this.isUserLoggedd;
  }
}
