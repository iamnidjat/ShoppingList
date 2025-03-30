import {Component, HostListener} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  imports: [
    NgClass
  ],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css',
  standalone: true
})
export class ScrollToTopComponent {
  public windowScrolled: boolean = false;

  @HostListener("window:scroll", [])
  public onWindowScroll(): void {
    if (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.scrollY || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  public scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  }
}
