import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected= new EventEmitter<Recipe>();

  recipes: Recipe[]=[
    new Recipe('Pasta', 'This recipe of pasta', 'https://images.pexels.com/photos/5907592/pexels-photo-5907592.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
    new Recipe('Pasta', 'This recipe of pastaaaaa', 'https://images.pexels.com/photos/5907592/pexels-photo-5907592.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipeEl: Recipe){
    this.recipeWasSelected.emit(recipeEl);
  }

}
