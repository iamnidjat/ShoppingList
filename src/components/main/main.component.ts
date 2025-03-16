import {Component, inject, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from '../header/header.component';
import {ManipulateDataService} from '../../services/manipulate-data.service';
import {Item} from '../../models/Item';

@Component({
  selector: 'app-main',
  imports: [HttpClientModule, HeaderComponent],
  providers: [ManipulateDataService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true
})
export class MainComponent implements OnInit {
  private myService = inject(ManipulateDataService);
  public items: Item[] = [];
  public flag: boolean = true;
  // public favFlag: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    // this.myService.getData().subscribe({next:(data:any) => {
    //   this.recipes = data["recipes"];
    // }})
    this.items = this.myService.getItems();
  }

  public modifyItem(item: Item) {
    alert("pretend that it works:)");
  }

  public switchMode(): void {
    this.flag = !this.flag;
  }

  public deleteItem(itemId: number): void {
    this.myService.deleteItem(itemId);
  }

  public updateItem(itemId: number, item: Item): void {
    this.myService.updateItem(itemId, item);
  }
  //
  // public switchFavMode(recipe: Recipe): void {
  //   this.favFlag = !this.favFlag;
  //   recipe.favourite = !recipe.favourite;
  // }
}
