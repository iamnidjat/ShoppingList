import {Component, inject, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-main',
  imports: [HttpClientModule, HeaderComponent],
  providers: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true
})
export class MainComponent implements OnInit {
  // private myService = inject(ManipulateDataService);
  // public recipes: Recipe[] = [];
  // public flag: boolean = true;
  // public favFlag: boolean = false;
  //
  // constructor() {
  // }
  //
  ngOnInit(): void {
    // this.myService.getData().subscribe({next:(data:any) => {
    //   this.recipes = data["recipes"];
    // }})
    //this.recipes = this.myService.getRecipes();
  }
  //
  // public modifyRecipe(recipe:Recipe) {
  //   alert("pretend that it works:)");
  // }
  //
  // public switchMode(): void {
  //   this.flag = !this.flag;
  // }
  //
  // public deleteRecipe(recipe: Recipe) {
  //   let storedData = localStorage.getItem('recipes');
  //   console.log(storedData)
  //
  //   if (storedData) {
  //     let recipes = JSON.parse(storedData);
  //     recipes = recipes.filter((recipe: { id: number }) => recipe.id !== recipe.id);
  //
  //     localStorage.setItem('recipes', JSON.stringify(recipes));
  //
  //     this.recipes = this.myService.getRecipes();
  //   }
  //   else {
  //     console.error("No recipes found in localStorage.");
  //   }
  // }
  //
  // public switchFavMode(recipe: Recipe): void {
  //   this.favFlag = !this.favFlag;
  //   recipe.favourite = !recipe.favourite;
  // }
}
