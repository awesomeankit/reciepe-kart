import { Subject } from "rxjs";
import { Ingridient } from "../shared/ingridient.model";

export class ShoppingListService{
    ingridientsChanged= new Subject<Ingridient[]>();
    startedEditing= new Subject<number>();
    private ingridients: Ingridient[]= [
        new Ingridient("Apples", 5),
        new Ingridient("Tomatoes", 3)
      ];

    getIngridients(){
      return this.ingridients.slice();
    }

    getIngridient(index: number){
      return this.ingridients[index];
    }
    
    addIngridient(ingridient: Ingridient){
      this.ingridients.push(ingridient);
      this.ingridientsChanged.next(this.ingridients.slice());
    }

    addIngridients(ingridients: Ingridient[]){
      // for(let ingridient of ingridients){
      //   this.addIngridient(ingridient);
      // }
      this.ingridients.push(...ingridients);
      this.ingridientsChanged.next(this.ingridients.slice());
    }
    
    updateIngridient(index: number, newIngridient: Ingridient){
      this.ingridients[index]= newIngridient;
      this.ingridientsChanged.next(this.ingridients.slice());
    }

    deleteIngridient(index: number){
      this.ingridients.splice(index, 1);
      this.ingridientsChanged.next(this.ingridients.slice());
    }

}