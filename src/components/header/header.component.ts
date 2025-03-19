import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {routes} from '../../app/app.routes';
import {SwitchLanguageService} from '../../services/switch-language.service';

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
  public SwitchLanguageService = inject(SwitchLanguageService);
  constructor(private router: Router) {
  }

  switchLang(lang: string): void {
    this.SwitchLanguageService.switchLang(lang);
  }

  public logOut(): void {
    let auth = localStorage.getItem('auth')!;
    localStorage.removeItem(auth);
    this.router.navigate(['/']);
  }
}
