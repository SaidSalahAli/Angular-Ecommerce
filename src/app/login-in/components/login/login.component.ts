import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.userLoginForm = this.fb.group({
      email: [''],
      password: [''],
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
          alert('User is logged');
          this.authService.login(); // Update user logged status
          this.userLoginForm.reset();
          this.router.navigate(['/cart']);
        } else {
          // Invalid credentials
          alert('Invalid credentials. Please try again or register a new account.');
        }
      },
      (err) => {
        alert('An error occurred while logging in. Please try again later.');
      }
    );
  
  }
  
  // submitt() {
  //     const emailControl = this.userLoginForm.get<any>('email');
  //     const passwordControl = this.userLoginForm.get<any>('password');

  //     if (emailControl && passwordControl) {
  //       const email = emailControl.value;
  //       const password = passwordControl.value;

  //       // Display entered user data
  //       console.log('Email:', email);
  //       console.log('Password:', password);

  //       const registeredData = this.authService.getRegisteredData();
  //       if (registeredData) {
  //         const registeredEmail = registeredData.email;
  //         const registeredPassword = registeredData.password;

  //         if (registeredEmail === email && registeredPassword === password) {
  //           // Login successful
  //           // You can perform any necessary actions here, such as setting authentication state or navigating to another page
  //           alert("Login successful!");

  //           console.log('Registered Email:', registeredEmail);
  //           console.log('Registered Password:', registeredPassword);
  //         } else {
  //           // Invalid credentials
  //           alert("Invalid credentials. Please try again or register a new account.");
  //         }
  //       }
  //     }


  // }



  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

}
