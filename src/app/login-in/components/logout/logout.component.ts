import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  userDeleted: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: UserAuthService
  ) {
    this.userDeleted = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit():void {

  }

  deleteAccount() {
    this.authService.logout();
    this.router.navigate(['/product']);
    // const email = this.userDeleted.value.email;
    // const password = this.userDeleted.value.password;

    // const options = {
    //   params: new HttpParams().set('email', email).set('password', password)
    // };

    // this.http.delete<any>('http://localhost:3000/userRegister/', options).subscribe(
    //   () => {
    //     alert('Your account has been deleted successfully.');
    //     this.authService.logout(); // Update user logged status
    //     this.userDeleted.reset();
    //     this.router.navigate(['/product']);
    //   },
    //   (error) => {
    //     alert('An error occurred while deleting your account. Please try again later.');
    //   }
    // );
  }
}
