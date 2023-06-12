import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private isUserLoggedd: boolean = false;
  
  constructor(
    private httpClient : HttpClient
  ) {
    this.isUserLoggedd = localStorage.getItem('isUserLogged') === 'true';
  }

  login() {
    // Perform login logic
    // Update user logged status in localStorage
    localStorage.setItem('isUserLogged', 'true');
    this.isUserLoggedd = true;
  }
  logout(){
    localStorage.removeItem('isUserLogged');
    this.isUserLoggedd = false;
  }


  deleteaccount(prdID: number): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:3000/userRegester/${prdID}`);
  }
  get isUserLogged() {
    return this.isUserLoggedd;
  }
}
