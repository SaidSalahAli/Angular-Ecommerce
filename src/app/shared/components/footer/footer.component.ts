import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Output() categorySelected = new EventEmitter<string>();
  cat: string[] = [];
  constructor(private prdCat: ProductsService) {
    this.prdCat.getAllCategories().subscribe((data: any) => (this.cat = data));
  }

  ngOnInit() {
  }

  filterCategory(category: string) {
    this.categorySelected.emit(category);
  }
}
