import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from './components/product/product.component';
import { FormsModule } from '@angular/forms';
import { SearshComponent } from '../shared/components/searsh/searsh.component';



@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailsComponent,
    ProductComponent,
    SearshComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ]
})
export class ProductsModule { }
