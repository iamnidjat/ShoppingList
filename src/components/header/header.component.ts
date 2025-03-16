import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {routes} from '../../app/app.routes';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  constructor(private router: Router) {
  }

  public logOut(): void {
    let username = localStorage.getItem('username')!;
    localStorage.removeItem(username);
    this.router.navigate(['/']);
  }
}
