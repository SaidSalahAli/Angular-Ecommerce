import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { NotificationService } from 'src/app/services/notification-service.service';
import { SmoothscrollService } from 'src/app/smoothscroll.service';
import { existEmailValidator } from 'src/app/CustomValidator/ExistEmail.validator';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  userDeleted: FormGroup; // Form group for user delete account form

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: UserAuthService,
    private toastr: NotificationService,
    private scrollService: SmoothscrollService,
  ) {
    this.userDeleted = this.fb.group({
      email: ['', [Validators.required, existEmailValidator()]], // Email field with required validation and custom validator
      password: ['', [Validators.required]], // Password field with required validation
    });
    scrollService.ngOnInit(); // Initialize the smooth scroll service
  }

  // Getter for email form control
  get email() {
    return this.userDeleted.get('email');
  }

  // Getter for password form control
  get password() {
    return this.userDeleted.get('password');
  }

  // Delete account form submission
  deleteAccount() {
    this.http.get<any>('http://localhost:3000/userRegester').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return a.email == this.userDeleted.value.email && a.password == this.userDeleted.value.password;
        });

        if (user) {
          // User is logged out
          this.router.navigate(['/product']);
          this.toastr.showSuccess('User is logged out.', 'Success');
          this.authService.logout(); // Update user logged status
          this.userDeleted.reset();
        } else {
          // Invalid email or password
          this.toastr.showError('Invalid email or password. Please try again.', 'Error');
        }
      }
    );
  }
}
