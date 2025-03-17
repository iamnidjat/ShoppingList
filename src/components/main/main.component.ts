import {Component, inject, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from '../header/header.component';
import {ManipulateDataService} from '../../services/manipulate-data.service';
import {Item} from '../../models/Item';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [HttpClientModule, HeaderComponent, FormsModule, NgStyle, NgForOf],
  providers: [ManipulateDataService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true
})
export class MainComponent implements OnInit {
  private myService = inject(ManipulateDataService);
  public items: Item[] = [];
  public flag: boolean = true;
  public category: string = "";
  // Pagination variables
  public currentPage: number = 1;
  public pageSize: number = 2;
  public totalPages: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.items = this.myService.getItems();
    this.totalPages = Math.ceil(this.items.length / this.pageSize);
  }

  // Pagination methods
  public getCurrentPageItems(): Item[] {
    const filteredCategories = this.filterItemsByCategory();
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, filteredCategories.length);
    return filteredCategories.slice(startIndex, endIndex);
  }

  public setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  public getPageNumbers(): number[] {
    let pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  public filterItemsByCategory(): Item[] {
    if (this.category) {
      return this.myService.filterItemsByCategory(this.category);
    }
    else {
      return this.items;
    }
  }

  public switchModel(): void {
    this.flag = !this.flag;
  }

  public deleteItem(itemId: number): void {
    this.myService.deleteItem(itemId);
    this.items = this.myService.getItems();
  }

  public modifyItem(itemId: number, itemName: string, itemCategory: string): void {
    const item = {name: itemName, category: itemCategory};
    this.myService.updateItem(itemId, item);
    this.flag = !this.flag;
    this.items = this.myService.getItems();
  }

  public changePurchasedField(itemId: number, productId: number): void {
    const item = this.items.find(item => item.id === itemId);

    if (item) {
      // Find the product by productId
      const product = item.products!.find(product => product.id === productId);

      if (product) {
        // Toggle the isPurchased field of the product
        product.isPurchased = !product.isPurchased;
      } else {
        console.log("Product not found");
      }
    } else {
      console.log("Item not found");
    }
  }
}
