import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient) {
    }

    storeRecipes(recipes: Recipe[]) {
        this.http.put('https://fir-backend-b0b37-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
            .subscribe(response => console.log(response));
    }

    fetchRecipes(): Observable<Recipe[]> {
        return this.http
            .get<Recipe[]>('https://fir-backend-b0b37-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                });
            }));
    }

}