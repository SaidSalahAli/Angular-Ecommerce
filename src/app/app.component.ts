
import { Component, OnInit } from '@angular/core';
import { SmoothscrollService } from './smoothscroll.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit   {

  constructor(private scrollService: SmoothscrollService) {}

  ngOnInit(): void {
    this.scrollService.scrollToTop();
  }
  
  title = 'Ecommerce';
}
