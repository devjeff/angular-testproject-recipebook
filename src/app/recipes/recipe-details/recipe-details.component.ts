import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../service/recipe.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private activeRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    // let id = +this.activeRoute.snapshot.params['id'];
    this.activeRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingListClicked() {
    this.recipeService.addToShoppingList(this.recipe);
  }

  onDelete() {
    this.recipeService.deletRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
