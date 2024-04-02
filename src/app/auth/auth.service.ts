import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const API_KEY = "AIzaSyBn1DsEK5Isnti74h7UClsINvkXKsFG7sk";

@Injectable({ providedIn: "root" })
export class AuthService {

    // Use a BehaviorSubject, so that later added subscribers still receive the change event
    userChanged = new BehaviorSubject<User>(null);
    private _loggedInUser: User = null;
    private _tokenExpirationTimer: any;

    get loggedInUser() {
        return this._loggedInUser;
    }

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(response => {
            this.handleAuth(response);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(response => {
            this.handleAuth(response);
        }));
    }

    autoLogin() {
        const userData = localStorage.getItem('user');
        if (!userData) {
            return;
        }

        const parsedUser: { email: string, id: string, _token: string, _expirationDate: string } = JSON.parse(userData);
        const loadedUser = new User(parsedUser.email, parsedUser.id, parsedUser._token, new Date(parsedUser._expirationDate));

        if (loadedUser) {
            this._loggedInUser = loadedUser;
            this.userChanged.next(loadedUser);
            const expirationDuration = new Date(parsedUser._expirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this._loggedInUser = null;
        localStorage.removeItem('user');
        if (this._tokenExpirationTimer) {
            clearTimeout(this._tokenExpirationTimer);
            this._tokenExpirationTimer = null;
        }
        this.userChanged.next(null);
        this.router.navigate(["/auth"]);
    }

    autoLogout(expDurationMillis: number) {
        this._tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expDurationMillis);
    }

    private handleAuth(response: AuthResponse) {
        const expirationMillis = +response.expiresIn * 1000;
        const expDate = new Date(new Date().getTime() + expirationMillis); // + converts it to a number
        const user = new User(response.email, response.localId, response.idToken, expDate);
        this._loggedInUser = user;
        this.userChanged.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.autoLogout(expirationMillis);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred';
        if (errorRes.error && errorRes.error.error) {
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'User with this email already exists';
                    break;
                case 'INVALID_LOGIN_CREDENTIALS':
                    errorMessage = 'Invalid login credentials';
                    break;
            }
        } else {
            console.log("Unknown error:");
            console.log(errorRes);
        }
        return throwError(() => errorMessage);
    }
}