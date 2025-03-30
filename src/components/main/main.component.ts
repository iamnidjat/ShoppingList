import {Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from '../header/header.component';
import {ManipulateDataService} from '../../services/manipulate-data.service';
import {Item} from '../../models/Item';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgStyle} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {ScrollToTopComponent} from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-main',
  imports: [HttpClientModule, HeaderComponent, FormsModule, NgStyle, NgForOf, TranslatePipe, DragDropModule, ScrollToTopComponent],
  providers: [ManipulateDataService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true
})
export class MainComponent implements OnInit {
  private myService = inject(ManipulateDataService);
  public items: Item[] = [];
  public editingItems: { [key: number]: boolean } = {};
  public category: string = "";
  // Pagination variables
  public currentPage: number = 1;
  public pageSize: number = 2;
  public totalPages: number = 0;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.items = this.myService.getItems();
    this.totalPages = Math.ceil(this.items.length / this.pageSize);
  }

  drop(event: CdkDragDrop<any[]>, item: Item) {
    if (item.products) {
      moveItemInArray(item.products, event.previousIndex, event.currentIndex);
    }

    this.cdr.detectChanges();
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

  public switchMode(itemId: number): void {
    this.editingItems[itemId] = !this.editingItems[itemId];
  }

  public deleteItem(itemId: number): void {
    this.myService.deleteItem(itemId);
    this.items = this.myService.getItems();
  }

  public modifyItem(itemId: number, itemName: string, itemCategory: string): void {
    const item = {name: itemName, category: itemCategory};
    this.myService.updateItem(itemId, item);
    this.switchMode(itemId);
    this.items = this.myService.getItems();
  }

  public changePurchasedField(itemId: number, productId: number): void {
    const item = this.items.find(item => item.id === itemId);

    if (item) {
      // Find the product by productId
      const product = item.products!.find(product => product.id === productId);

      if (product) {
        product.isPurchased = !product.isPurchased;
        localStorage.setItem(`item${itemId}`, JSON.stringify(item));
        this.getPurchasedCount(item);
      } else {
        console.log("Product not found");
      }
    } else {
      console.log("Item not found");
    }
  }

  public getPurchasedCount(item: any): number {
    return item.products.filter((product: any) => product.isPurchased).length;
  }
}
