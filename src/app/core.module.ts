import { NgModule } from "@angular/core";
import { ShoppingListService } from "./shopping-list/service/shopping-list.service";
import { RecipeService } from "./recipes/service/recipe.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./auth/auth.interceptor";


@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        ShoppingListService, // wouldn't be necessary if I had used { providedIn: "root" }
        RecipeService, 
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
})
export class CoreModule {

}