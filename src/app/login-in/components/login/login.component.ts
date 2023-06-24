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
  userLoginForm!: FormGroup; // Form group for user login form
  isUserLogged: boolean = false; // Flag to track user login status
  errorMessage: string = ''; // Error message for invalid credentials

  constructor(
    private authService: UserAuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: NotificationService,
    private scrollService: SmoothscrollService
  ) {
    scrollService.ngOnInit(); // Initialize the smooth scroll service
  }

  ngOnInit() {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, existEmailValidator()]], // Email field with required validation and custom validator
      password: ['', [Validators.required]], // Password field with required validation
    });
    this.isUserLogged = this.authService.isUserLogged; // Check if the user is already logged in
  }

  // Login form submission
  submit() {
    this.http.get<any>('http://localhost:3000/userRegester').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return a.email == this.userLoginForm.value.email && a.password == this.userLoginForm.value.password;
        });

        if (user) {
          // User is logged in
          this.router.navigate(['/cart']);
          this.toastr.showSuccess('User is logged.', 'Success');
          this.authService.login(); // Update user logged status
          this.userLoginForm.reset();
        } else {
          // Invalid credentials
          this.toastr.showError('Invalid credentials. Please try again or register a new account.', 'error');
        }
      }
    );
  }

  // Getter for email form control
  get email() {
    return this.userLoginForm.get('email');
  }

  // Getter for password form control
  get password() {
    return this.userLoginForm.get('password');
  }
}
