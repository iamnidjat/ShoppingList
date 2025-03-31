import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {routes} from '../../app/app.routes';
import {SwitchLanguageService} from '../../services/switch-language.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent implements OnInit{
  public SwitchLanguageService = inject(SwitchLanguageService);
  public visibility: boolean = false;

  constructor(private router: Router) {}

  switchLang(lang: string): void {
    this.SwitchLanguageService.switchLang(lang);
  }

  public logOut(): void {
    localStorage.removeItem("auth");
    localStorage.removeItem("visibility");
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.visibility = !!localStorage.getItem("visibility");
  }
}
