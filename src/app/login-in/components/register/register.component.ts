

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
  userRegisterForm!: FormGroup;
  existUserEmails: string[] = [];
  emailFocused: boolean = false;
  constructor(private fb: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private toastr :NotificationService,) {

  }

  ngOnInit() {
    this.userRegisterForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('[A-Z a-z]{4,}')]],
      email: ['', [Validators.required, existEmailValidator()]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: [passwordMatch()] });
  }


  submit() {
    this.http.post<any>('http://localhost:3000/userRegester', this.userRegisterForm.value)
      .subscribe((res: any) => {
        this.toastr.showSuccess('Sign up is success', "Success")
        this.userRegisterForm.reset();
        this.router.navigate(['/login'])
      })

  }


  get fullName() {
    return this.userRegisterForm.get('fullName');
  }

  get email() {
    return this.userRegisterForm.get('email');
  }

  get password() {
    return this.userRegisterForm.get('password');
  }

  get confirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }

}

