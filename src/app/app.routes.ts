import { Routes } from '@angular/router';
import {AuthComponent} from '../components/auth/auth.component';
import {MainComponent} from '../components/main/main.component';
import {NotFoundComponent} from '../components/not-found/not-found.component';
import {authGuard} from '../guards/auth.guard';
import {AddItemComponent} from '../components/add-item/add-item.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "main",
    component: MainComponent,
    canActivate: [authGuard]
  },
  {
    path: "add-item",
    component: AddItemComponent,
    canActivate: [authGuard]
  },
  {
    path: "**",
    component: NotFoundComponent,
  }
];
