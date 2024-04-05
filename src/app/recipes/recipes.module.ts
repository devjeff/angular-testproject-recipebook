import { NgModule, inject } from "@angular/core";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeResolverService } from "./service/recipe-resolver.service";
import { SharedModule } from "../shared/shared.module";

const appRoutes: Routes = [
    {
        path: 'recipes', component: RecipesComponent, canActivate: [() => inject
        (AuthGuard).canActivate()], children: [
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailsComponent, resolve: {'recipes': () => inject(RecipeResolverService).resolve()}},
            {path: ':id/edit', component: RecipeEditComponent, resolve: {'recipes': () => inject(RecipeResolverService).resolve()}},
        ]
    }
];

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailsComponent,
        RecipesComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        RouterModule.forChild(appRoutes),
        SharedModule,
        ReactiveFormsModule,
    ]
})
export class RecipesModule {

}