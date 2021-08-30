import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode= false;
  recipeForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params)=>{
        this.id= +params['id'];
        this.editMode= params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName='';
    let recipeImagepath='';
    let recipeDesc= '';
    let recipeIngridients= new FormArray([]);
    if(this.editMode){
      const recipe= this.recipeService.getRecipe(this.id);
      recipeName= recipe.name;
      recipeImagepath= recipe.imagePath;
      recipeDesc= recipe.description;
      if(recipe['ingridients']){
        for(let ingridient of recipe.ingridients){
          recipeIngridients.push(
            new FormGroup({
              'name': new FormControl(ingridient.name, Validators.required),
              'amount': new FormControl(ingridient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm= new FormGroup({
      'name':new FormControl(recipeName, Validators.required),
      'imagePath':new FormControl(recipeImagepath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingridients': recipeIngridients
    });
  }

  onSubmit(){
    const newRecipe= new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingridients']
    );
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
    }else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['../'], {relativeTo:this.activatedRoute});
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingridients')).controls;
  }

  onAddIngridient(){
    (<FormArray>this.recipeForm.get('ingridients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.activatedRoute});
  }

  onDeleteIngridient(index: number){
    (<FormArray>this.recipeForm.get('ingridients')).removeAt(index);
  }

}
