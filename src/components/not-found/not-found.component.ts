import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {FooterComponent} from '../footer/footer.component';
import {ScrollToTopComponent} from '../scroll-to-top/scroll-to-top.component';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-not-found',
  imports: [
    TranslatePipe,
    FooterComponent,
    ScrollToTopComponent,
    HeaderComponent
  ],
  providers: [Location],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  standalone: true
})
export class NotFoundComponent {
  constructor(private location: Location) {}

  public goBack(): void {
    this.location.back();
  }
}
