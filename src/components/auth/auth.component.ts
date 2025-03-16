import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  standalone: true
})
export class AuthComponent {
  public username: string = '';
  public password: string = '';

  constructor(private router: Router) {}

  public onSubmit(): void {
    this.signIn(this.username, this.password);
  }

  private signIn(username: string, password: string): void {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem("auth", username);
      this.router.navigate(['main']);
    }
    else {
      alert("Incorrect credentials");
      this.username = "";
      this.password = "";
    }
  }
}
