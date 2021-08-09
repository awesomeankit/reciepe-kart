import { Component, OnInit } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingridients: Ingridient[];
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingridients = this.shoppingListService.getIngridients();
    this.shoppingListService.ingridientsChanged.subscribe(
      (ingridients: Ingridient[])=>{
        this.ingridients= ingridients;
      }
    );
  }

}
