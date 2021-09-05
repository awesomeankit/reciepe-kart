import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: "root"})
export class DataStorageService{

    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService){}

    storeRecipes(){
        const recipes= this.recipeService.getRecipes();
        this.httpClient.put('https://ng-complete-guide-d2911-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(
                response=>{
                    console.log(response);
                }
            );
    }

    fetchRecipes(){
        return this.httpClient.get<Recipe[]>('https://ng-complete-guide-d2911-default-rtdb.firebaseio.com/recipes.json').pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe, ingridients: recipe.ingridients?recipe.ingridients:[]}
            }
            );
        }), 
        tap(recipes=>{
            this.recipeService.setRecipes(recipes);
        }
        ))
    }

}