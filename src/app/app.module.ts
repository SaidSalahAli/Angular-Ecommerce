import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartsModule } from './carts/carts.module';

import { SharedModule } from './shared/shared.module';
import { LoginInModule } from './login-in/login-in.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SmoothscrollService } from './smoothscroll.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [	
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    CartsModule,
    SharedModule,
    LoginInModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ timeOut: 3500,
      positionClass: 'toast-top-left',
      preventDuplicates: true,}),
     NgbModule, // ToastrModule added

  ],
  providers: [SmoothscrollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
