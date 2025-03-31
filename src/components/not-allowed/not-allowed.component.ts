import { Component } from '@angular/core';
import {Location} from '@angular/common';
import {TranslatePipe} from "@ngx-translate/core";
import {HeaderComponent} from '../header/header.component';
import {ScrollToTopComponent} from '../scroll-to-top/scroll-to-top.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-not-allowed',
  imports: [
    TranslatePipe,
    HeaderComponent,
    ScrollToTopComponent,
    FooterComponent
  ],
  templateUrl: './not-allowed.component.html',
  styleUrl: './not-allowed.component.css',
  standalone: true
})
export class NotAllowedComponent {
  constructor(private location: Location) {}

  public goBack(): void {
    this.location.back();
  }
}
