import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {ManipulateDataService} from '../../services/manipulate-data.service';
import {Item} from '../../models/Item';
import {HeaderComponent} from '../header/header.component';
import {NgForOf, NgStyle} from '@angular/common';
import {Product} from '../../models/Product';

@Component({
  selector: 'app-add-item',
  imports: [
    HeaderComponent,
    NgStyle,
    NgForOf
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
  standalone: true
})
export class AddItemComponent {
  private myService = inject(ManipulateDataService);
  public flag: boolean = false;
  public products: Product[] = [];
  public categories: string[] = ["Fruits", "Vegetables", "Meat", "Dairy", "Snacks"];

  constructor(private router: Router) {
  }

  public switchMode(): void {
    this.flag = !this.flag;
  }

  public addProducts(productName: string, productQuantity: string): void {
    const product: Product = {
      name: productName,
      quantity: parseInt(productQuantity),
      isPurchased: false
    };

    this.products.push(product);
    this.switchMode();
  }

  public removeProduct(productId: number): void {
    this.products = this.products.filter(product => product.id !== productId);
  }

  public addItem(name: string, category: string): void {
    const currentItemsCount = localStorage.length;
    const itemId = currentItemsCount + 1;

    const item: Item = {
      id: itemId,
      name: name,
      category: category,
      products: this.products
    };

    this.myService.addItem(item);
    this.router.navigate(['/main']);
  }
}
