import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('https://identitytoolkit.googleapis.com/v1/accounts')) {
            return next.handle(req);
        }

        const modifiedReq = req.clone({
            params: new HttpParams().set('auth', this.authService.loggedInUser.token)
        });
        return next.handle(modifiedReq);
    }

}