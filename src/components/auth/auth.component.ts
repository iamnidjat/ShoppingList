import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {ScrollToTopComponent} from '../scroll-to-top/scroll-to-top.component';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    NgIf,
    NgClass
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  standalone: true
})
export class AuthComponent {
  private translate = inject(TranslateService);
  public username: string = "";
  public password: string = "";
  public hiddenEye: boolean = false;
  public showTooltip: boolean = false;

  constructor(private router: Router) {}

  public onSubmit(): void {
    this.signIn(this.username, this.password);
  }

  public showText(): void {
    if (!this.password) return;
    this.hiddenEye = !this.hiddenEye;
  }

  private signIn(username: string, password: string): void {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem("auth", username);
      localStorage.setItem("visibility", "true");
      this.router.navigate(['main']);
    }
    else {
      alert(this.translate.instant("invalid-credentials"));
      this.username = "";
      this.password = "";
    }
  }
}
