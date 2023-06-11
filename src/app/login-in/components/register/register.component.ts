

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { existEmailValidator } from 'src/app/CustomValidator/ExistEmail.validator';
import { passwordMatch } from 'src/app/CustomValidator/PasswordMatch.validator';
import { User } from 'src/app/Models/User';
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
    private http: HttpClient,) {

  }

  ngOnInit() {
    this.userRegisterForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('[A-Z a-z]{4,}')]],
      email: ['', [Validators.required,]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: [passwordMatch()] });
  }


  submit() {
    this.http.post<any>('http://localhost:3000/userRegester', this.userRegisterForm.value)
      .subscribe((res: any) => {
        alert('sign is success')
        this.userRegisterForm.reset();
        this.router.navigate(['/login'])
      }, err => {
        alert('sign is error')
      })

  }


  // submit() {
  //   if (this.userRegisterForm.valid) {
  //     const userModel = this.userRegisterForm.value;
  //     // Check if the user already exists
  //     if (this.isUserAlreadyRegistered(userModel)) {
  //       alert("User already exists!");
  //     } else {
  //       // Get existing user data from local storage
  //       const existingUserData = localStorage.getItem('userData');
  //       let userData = [];

  //       if (existingUserData) {
  //         // Parse the existing user data if available
  //         userData = JSON.parse(existingUserData);
  //       }
  //       // Add the new user to the array
  //       userData.push(userModel);
  //       // Save updated user data in local storage
  //       localStorage.setItem('userData', JSON.stringify(userData));
  //       alert("User registered successfully!");

  //     this.router.navigate(['./login'])
  //     }
  //   } else {
  //     alert("Please fill in the required data correctly.");
  //   }
  // }



  // isUserAlreadyRegistered(userModel: any): boolean {
  //   // Get existing user data from local storage
  //   const existingUserData = localStorage.getItem('userData');

  //   if (existingUserData) {
  //     // Parse the existing user data if available
  //     const userData = JSON.parse(existingUserData);

  //     // Check if the user already exists based on email or any other unique identifier
  //     const isUserExists = userData.some((user: any) => user.email === userModel.email);

  //     return isUserExists;
  //   }
  //   return false;
  // }

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

