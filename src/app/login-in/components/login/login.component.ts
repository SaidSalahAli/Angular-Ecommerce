import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification-service.service';
import { SmoothscrollService } from 'src/app/smoothscroll.service';
import { existEmailValidator } from 'src/app/CustomValidator/ExistEmail.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  isUserLogged: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: UserAuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr :NotificationService,
    private scrollService: SmoothscrollService,
    
  ) {
    scrollService.ngOnInit();
  }


  ngOnInit() {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, existEmailValidator()]],
      password: ['', [Validators.required]],
    });
    this.isUserLogged = this.authService.isUserLogged;
  }

  submitt() {
    this.http.get<any>('http://localhost:3000/userRegester').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return a.email == this.userLoginForm.value.email && a.password == this.userLoginForm.value.password;
        });

        if (user) {
          // User is logged
          this.router.navigate(['/cart']);
          this.toastr.showSuccess('User is logged' ,"Success")
          this.authService.login(); // Update user logged status
          this.userLoginForm.reset();
        } else {
          // Invalid credentials
          this.toastr.showError('Invalid credentials. Please try again or register a new account.' ,"error")
        }
      }
    );
  
  }
  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

}
