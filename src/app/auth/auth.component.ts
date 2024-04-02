import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {

    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;

    let authObservable: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe(responseData => {
      this.isLoading = false;
      this.router.navigate(["/recipes"]);
    }, errorRes => {
      this.isLoading = false;
      this.errorMessage = errorRes;
    });

    authForm.reset();
  }

  onHandleError() {
    this.errorMessage = null;
  }
}
