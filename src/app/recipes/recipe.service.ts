import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingridient } from "../shared/ingridient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    recipesChanged= new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService){}
    private recipes: Recipe[]=[];

     getRecipes(){
         return this.recipes.slice();
     }

     getRecipe(id: number){
         return this.recipes[id];
     }
     
     addIngridientsToShoppingList(ingridients: Ingridient[]){
        this.shoppingListService.addIngridients(ingridients);
     }

     addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
     }

     updateRecipe(index: number, recipe: Recipe){
        this.recipes[index]= recipe;
        this.recipesChanged.next(this.recipes.slice());
     }

     deleteRecipe(index: number){
         this.recipes.splice(index, 1);
         this.recipesChanged.next(this.recipes.slice());
     }

     setRecipes(recipes: Recipe[]){
         this.recipes= recipes;
         this.recipesChanged.next(this.recipes.slice());
     }
}