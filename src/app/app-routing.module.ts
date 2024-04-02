import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NgModule, inject } from "@angular/core";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/service/recipe-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'shopping-list', component: ShoppingListComponent },
    {
        path: 'recipes', component: RecipesComponent, canActivate: [() => inject(AuthGuard).canActivate()], children: [
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailsComponent, resolve: {'recipes': () => inject(RecipeResolverService).resolve()}},
            {path: ':id/edit', component: RecipeEditComponent, resolve: {'recipes': () => inject(RecipeResolverService).resolve()}},
        ]
    },
    { path: 'auth', component: AuthComponent},
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRountingModule {

}