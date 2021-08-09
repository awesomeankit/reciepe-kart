import { EventEmitter, Injectable } from "@angular/core";
import { Ingridient } from "../shared/ingridient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    constructor(private shoppingListService: ShoppingListService){}
    recipeSelected= new EventEmitter<Recipe>();
    private recipes: Recipe[]=[
        new Recipe('Pasta', 'This recipe of pasta', 'https://images.pexels.com/photos/5907592/pexels-photo-5907592.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', [new Ingridient('sugar',2), new Ingridient('Wheat flour',4)]),
        new Recipe('Burger', 'This recipe of pastaaaaa', 'https://images.pexels.com/photos/5907592/pexels-photo-5907592.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', [new Ingridient('Chicken',5), new Ingridient('Salt',1)])
      ];

     getRecipes(){
         return this.recipes.slice();
     }
     
     addIngridientsToShoppingList(ingridients: Ingridient[]){
        this.shoppingListService.addIngridients(ingridients);
     }
}