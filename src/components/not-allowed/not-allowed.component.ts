import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-not-allowed',
  imports: [],
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
