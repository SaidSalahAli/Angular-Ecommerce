import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { existEmailValidator } from 'src/app/CustomValidator/ExistEmail.validator';
import { passwordMatch } from 'src/app/CustomValidator/PasswordMatch.validator';
import { User } from 'src/app/Models/User';
import { NotificationService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegisterForm!: FormGroup; // Form group for user registration form
  existUserEmails: string[] = []; // Array to store existing user emails
  emailFocused: boolean = false; // Flag to track if the email input is focused

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastr: NotificationService,
  ) {}

  ngOnInit() {
    this.userRegisterForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('[A-Z a-z]{4,}')]], // Full name field with required validation and pattern validation
      email: ['', [Validators.required, existEmailValidator()]], // Email field with required validation and custom validator
      password: ['', [Validators.required]], // Password field with required validation
      confirmPassword: ['', [Validators.required]], // Confirm password field with required validation
    }, { validators: [passwordMatch()] }); // Custom validator to ensure password and confirm password match
  }

  // Registration form submission
  submit() {
    this.http.post<User>('http://localhost:3000/userRegester', this.userRegisterForm.value)
      .subscribe((res: User) => {
        this.toastr.showSuccess('Sign up is success', 'Success');
        this.userRegisterForm.reset();
        this.router.navigate(['/login']);
      });
  }

  // Getter for full name form control
  get fullName() {
    return this.userRegisterForm.get('fullName');
  }

  // Getter for email form control
  get email() {
    return this.userRegisterForm.get('email');
  }

  // Getter for password form control
  get password() {
    return this.userRegisterForm.get('password');
  }

  // Getter for confirm password form control
  get confirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }
}
