import { Injectable } from '@angular/core';
import {Item} from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ManipulateDataService {

  constructor() { }

  public getItems(): Item[] {
    const items: Item[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && key.startsWith('item')) {
        const item = localStorage.getItem(key);
        if (item) {
          items.push(JSON.parse(item));
        }
      }
    }

    return items;
  }

  public getItem(itemId: number): Item | null {
    const item = localStorage.getItem(`item${itemId}`);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  public addItem(item: Item): void {
    localStorage.setItem(`item${item.id}`, JSON.stringify(item));
  }

  public deleteItem(itemId: number): void {
    const item = localStorage.getItem(`item${itemId}`);

    if (item) {
      localStorage.removeItem(`item${itemId}`);
    }
  }

  public updateItem(itemId: number, newItem: Item): void {
    const item = localStorage.getItem(`item${itemId}`);

    if (item) {
      localStorage.setItem(`item${itemId}`, JSON.stringify(newItem));
    }
  }

  public filterItemsByCategory(category: string): Item[] {
    const filteredItems: Item[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && key.startsWith('item')) {
        const itemData = localStorage.getItem(key);
        if (itemData) {
          const item: Item = JSON.parse(itemData);

          // ✅ Filter by category (case-insensitive)
          if (!category || item.category.toLowerCase().includes(category.toLowerCase())) {
            filteredItems.push(item);
          }
        }
      }
    }

    return filteredItems;
  }
}
