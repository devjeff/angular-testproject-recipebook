import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

const appRoutes: Routes = [
    { path: 'auth', component: AuthComponent},
];

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(appRoutes),
    ],
    exports: [
        CommonModule,
        RouterModule,
    ]
})
export class AuthModule {

}