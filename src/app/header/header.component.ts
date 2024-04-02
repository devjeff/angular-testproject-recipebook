import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipes/service/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private recipeService: RecipeService, private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log("header initialized");
    this.userSub = this.authService.userChanged.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onFetchData() {
    this.recipeService.fetchRecipes();
  }

  onSaveData() {
    this.recipeService.saveRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
