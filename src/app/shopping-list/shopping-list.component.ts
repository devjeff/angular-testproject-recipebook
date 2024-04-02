import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './service/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  ingChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe((newIngredients) => { this.ingredients = newIngredients });
  }

  ngOnDestroy(): void {
    this.ingChangedSubscription.unsubscribe();
  }

  onShoppingItemAdded(item: Ingredient) {
    this.shoppingListService.addIngredient(item);
  }

  onItemClicked(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }

}
