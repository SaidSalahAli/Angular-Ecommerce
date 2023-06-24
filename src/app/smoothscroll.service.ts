import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmoothscrollService implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.scrollToTop();
  }
 
  /**
   * Scrolls to the top of the page smoothly.
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
