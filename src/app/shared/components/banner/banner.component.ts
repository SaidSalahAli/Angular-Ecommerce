import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/models/product';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() products: Product[] = [];
  constructor() { }

  ngOnInit() {
  }

}
