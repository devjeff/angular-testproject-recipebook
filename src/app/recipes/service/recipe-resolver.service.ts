import { Injectable } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: 'root' })
export class RecipeResolverService {


    constructor(private recipeService: RecipeService) {
    }

    resolve(): Observable<Recipe[]> | Recipe[] {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length > 0) {
            return recipes;
        }

        return this.recipeService.resolveRecipes();
    }
}