import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../../shopping-list/service/shopping-list.service";
import { Observable, Subject, tap } from "rxjs";
import { DataStorageService } from "../../shared/data-storage.service";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [];
    // [
    //     new Recipe(
    //         "Mega Cake",
    //         "Very special cake, really tasty",
    //         "https://images.lecker.de/pfirsich-maracuja-torte-b1,id=30422f31,b=lecker,w=1200,rm=sk.jpeg",
    //         [
    //             new Ingredient("Cream", 1),
    //             new Ingredient("Peach", 4),
    //             new Ingredient("Sugar", 100),
    //         ]
    //     ),
    //     new Recipe(
    //         "Super Cake",
    //         "A different cake, really tasty",
    //         "https://st4.depositphotos.com/10614052/25239/i/450/depositphotos_252391082-stock-photo-sweet-chocolate-cake-on-wooden.jpg",
    //         [
    //             new Ingredient("Flour", 150),
    //             new Ingredient("Chocolate", 100),
    //             new Ingredient("Sugar", 200),
    //         ]
    //     ),
    // ];

    recipesChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService, private dataStorageService: DataStorageService) {
    }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.getRecipes());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.getRecipes());
    }

    deletRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.getRecipes());
    }

    addToShoppingList(recipe: Recipe) {
        this.shoppingListService.addIngredients(recipe.ingredients);
    }

    saveRecipes() {
        this.dataStorageService.storeRecipes(this.recipes);
    }

    fetchRecipes() {
        this.dataStorageService.fetchRecipes().subscribe(recipesResponse => {
            this.recipes = recipesResponse;
            this.recipesChanged.next(this.getRecipes());
        });
    }

    resolveRecipes(): Observable<Recipe[]> {
        return this.dataStorageService.fetchRecipes().pipe(tap(recipesResponse => {
            console.log("Resolving recipes...");
            this.recipes = recipesResponse;
        }));
    }
}
