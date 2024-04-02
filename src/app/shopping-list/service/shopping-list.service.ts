import { Subject } from "rxjs";
import { Ingredient } from "../../shared/ingredient.model";

export class ShoppingListService {

    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Bananas", 10),
    ];

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    getIngredient(id: number): Ingredient {
        return this.ingredients[id];
    }

    addIngredient(item: Ingredient) {
        this.ingredients.push(item);
        this.ingredientsChanged.next(this.getIngredients());
    }

    updateIngredient(id: number, item: Ingredient) {
        this.ingredients[id] = item;
        this.ingredientsChanged.next(this.getIngredients());
    }

    deleteIngredient(id: number) {
        this.ingredients.splice(id, 1);
        this.ingredientsChanged.next(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.getIngredients());
    }
}