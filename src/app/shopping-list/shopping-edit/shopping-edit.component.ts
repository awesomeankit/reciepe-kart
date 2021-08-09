import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingridient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", {static: false})
  nameInputRef: ElementRef;
  @ViewChild("amountInput", {static: false})  
  amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddIngridient(){
   this.shoppingListService.addIngridient(new Ingridient(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value
    ));
  }

}
