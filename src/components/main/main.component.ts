import {Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from '../header/header.component';
import {ManipulateDataService} from '../../services/manipulate-data.service';
import {Item} from '../../models/Item';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgStyle} from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {ScrollToTopComponent} from '../scroll-to-top/scroll-to-top.component';
import {Product} from '../../models/Product';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-main',
  imports: [HttpClientModule, HeaderComponent, FormsModule, NgStyle, NgForOf, TranslatePipe, DragDropModule, ScrollToTopComponent, FooterComponent],
  providers: [ManipulateDataService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true
})
export class MainComponent implements OnInit {
  private myService = inject(ManipulateDataService);
  private translate = inject(TranslateService);
  public items: Item[] = [];
  public editingItems: { [key: number]: boolean } = {};
  public category: string = "";
  // Pagination variables
  public currentPage: number = 1;
  public pageSize: number = 2;
  public totalPages: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

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

  public modifyItem(itemId: number, itemName: string, itemCategory: string, products: Product[]): void {
    if (itemName !== '' && itemCategory !== '')
    {
      for (let product of products) {
        if (product.name === '' || isNaN(product.quantity) || product.quantity <= 0) {
          alert(this.translate.instant('invalid-product'));
          return;
        }
      }

      const item = {id: itemId, name: itemName, category: itemCategory, products: products};
      this.myService.updateItem(itemId, item);
      this.switchMode(itemId);
      this.items = this.myService.getItems();
    } else {
      alert(this.translate.instant('fill-blanks'));
    }
  }

  public changePurchasedField(itemId: number, productId: number): void {
    const item = this.items.find(item => item.id === itemId);

    if (item) {
      const product = item.products!.find(product => product.id === productId);

      if (product) {
        product.isPurchased = !product.isPurchased;
        localStorage.setItem(`item${itemId}`, JSON.stringify(item));
        this.getPurchasedCount(item);
      } else {
        console.log(this.translate.instant('item-not-found'));
      }
    } else {
      console.log(this.translate.instant('item-not-found'));
    }
  }

  public getPurchasedCount(item: any): number {
    return item.products.filter((product: any) => product.isPurchased).length;
  }

  public copyListToClipboard(): void {
    let listText = this.translate.instant('shopping-list') + ":\n\n";

    this.items.forEach(item => {
      listText += `📌 ${item.name} (${item.category})\n`;

      if (item.products && item.products.length > 0) {
        item.products.forEach((product, index) => {
          listText += `   ${index + 1}. ${product.name} - ${product.quantity} - ${product.isPurchased ? this.translate.instant('purchased') : this.translate.instant('not-purchased')}\n`;
        });
      }

      listText += "\n";
    });

    navigator.clipboard.writeText(listText).then(() => {
      alert(this.translate.instant('list-copied'));
    }).catch(err => {
      console.error(this.translate.instant('copy-failed'), err);
    });
  }

  public shareOnWhatsApp(): void {
    let listText = this.translate.instant('shopping-list') + ":\n\n";

    this.items.forEach(item => {
      listText += encodeURIComponent(`📌 ${item.name} (${item.category})\n`);

      if (item.products && item.products.length > 0) {
        item.products.forEach((product, index) => {
          listText += encodeURIComponent(`   ${index + 1}. ${product.name} - ${product.quantity} - ${product.isPurchased ? this.translate.instant('purchased') : this.translate.instant('not-purchased')}\n`);
        });
      }

      listText += encodeURIComponent("\n");
    });

    const whatsappUrl = `https://wa.me/?text=${listText}`;
    window.open(whatsappUrl, "_blank");
  }
}
