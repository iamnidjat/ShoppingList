import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [],
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
