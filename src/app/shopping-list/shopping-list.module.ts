import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

const appRoutes: Routes = [
    { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports: [
        RouterModule.forChild(appRoutes),
        SharedModule,
        FormsModule,
    ]
})
export class ShoppingListModule {

}