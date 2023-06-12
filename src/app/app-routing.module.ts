import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { AuthGuard } from './Garurds/auth.guard';
import { LoginComponent } from './login-in/components/login/login.component';
import { RegisterComponent } from './login-in/components/register/register.component';
import { LogoutComponent } from './login-in/components/logout/logout.component';



const routes: Routes = [
  { path: "products", component: AllProductsComponent },
  { path: "details/:id", component: ProductsDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: "**", redirectTo: "products", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
