import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Router, UrlTree } from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthGuard {

    constructor(private authService: AuthService, private router: Router) {}
    
    canActivate(): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        if (this.authService.loggedInUser != null) {
            return true;
        } else {
            return this.router.createUrlTree(["/auth"]);
        };
    }
}