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
  userDeleted: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: UserAuthService,
    private toastr: NotificationService,
    private scrollService: SmoothscrollService,
  ) {
    this.userDeleted = this.fb.group({
      email: ['', [Validators.required, existEmailValidator()]],
      password: ['', [Validators.required]],
    });
    scrollService.ngOnInit();
  }

  get email() {
    return this.userDeleted.get('email');
  }

  get password() {
    return this.userDeleted.get('password');
  }


  deleteAccount() {
    this.http.get<any>('http://localhost:3000/userRegester').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return a.email == this.userDeleted.value.email && a.password == this.userDeleted.value.password;
        });

        if (user) {
          // User is Logout, 
          this.router.navigate(['/product']);
          this.toastr.showSuccess('User is logout', "Success")
          this.authService.logout();
          this.userDeleted.reset();
        } else {

          this.toastr.showError('Invalid email or password. Please try again.', 'Error');
        }
      }
    );

  }
}

