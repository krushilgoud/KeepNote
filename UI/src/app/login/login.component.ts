import { RouterService } from './../services/router.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    constructor(private authService: AuthenticationService, private routerService: RouterService) {
        if (authService.getBearerToken()) {
            this.routerService.routeToNoteView();
        }
    }

    username = new FormControl('', Validators.required);
    password = new FormControl('', Validators.required);
    submitMessage = '';
    token: string;

    login() {
        console.log("Inside UI login...");
        this.submitMessage = '';
        if (this.username.hasError('required') || this.password.hasError('required')) {
            this.submitMessage = 'Enter credentials';
        } else {
            console.log("Sending credentials...");
            this.submitMessage = '';
            this.authService.authenticateUser({'username': this.username.value, 'password': this.password.value})
            .subscribe(result => {
                console.log("Authorized...");
                //console.log(result);
                this.token = result['token'];
                //console.log(this.token);
                this.authService.setBearerToken(this.token);
                console.log("Routing to dashboard...");
                this.routerService.routeToDashboard();
            },
            errorMessage => {
                if (errorMessage.status === 403) {
                this.submitMessage = errorMessage.error.message;
                } else {
                this.submitMessage = errorMessage.message;
                }
            });
        }
    }

    showUsernameErrorMessage(): string {
        return this.username.hasError('required') ? 'Enter email address' : '';
    }
    
    showPasswordErrorMessage(): string {
        return this.password.hasError('required') ? 'Enter password' : '';
    }

    navigateToRegister() {
        this.routerService.routeToRegister();
    }
}
