import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingridient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f', {static: false})
  slForm: NgForm;
  subscription: Subscription;
  editMode= false;
  editedItemIndex: number;
  editedItem: Ingridient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number)=>{
        this.editMode= true;
        this.editedItemIndex= index;
        this.editedItem= this.shoppingListService.getIngridient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddIngridient(form: NgForm){
   const newIngridient= new Ingridient(form.value.name, form.value.amount);
   if(!this.editMode){
     this.shoppingListService.addIngridient(newIngridient);
   }else{
     this.shoppingListService.updateIngridient(this.editedItemIndex, newIngridient);
   }
   this.editMode= false;
   form.reset(); 
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClear(){
    this.editMode= false;
    this.slForm.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngridient(this.editedItemIndex);
    this.onClear();
  }

}
