import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from './components/product/product.component';
import { FormsModule } from '@angular/forms';
import { SearshComponent } from '../shared/components/searsh/searsh.component';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
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
    NgImageSliderModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    CarouselModule

  ]
})
export class ProductsModule { }
