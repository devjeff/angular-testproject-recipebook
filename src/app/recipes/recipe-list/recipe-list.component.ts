import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../service/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy{
  
  recipes: Recipe[];
  recipeSubscription: Subscription;

	constructor(private recipeService: RecipeService) {
	}
  
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(newRecipies => {
      this.recipes = newRecipies;
    });
  }

  ngOnDestroy(): void {
    this.recipeSubscription?.unsubscribe();
  }

}
