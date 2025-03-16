import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {ManipulateDataService} from '../../services/manipulate-data.service';
import {Item} from '../../models/Item';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-add-item',
  imports: [
    HeaderComponent
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
  standalone: true
})
export class AddItemComponent {
  private myService = inject(ManipulateDataService);

  constructor(private router: Router) {
  }

  public addItem(name: string, category: string): void {
    const item: Item = { name: name, category: category };
    this.myService.addItem(item);
    this.router.navigate(['/main']);
  }
}
