import { RouterService } from './../services/router.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomValidationsDirective } from './custom.validations';
import { RegisterService } from '../services/register.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    constructor(private service: RegisterService, private routerService: RouterService) {}
        show = true;
        errorMessage = undefined;
        emailErrorMessage = undefined;
        passwordErrorMessage = undefined;
        emailaddress = new FormControl('', [Validators.required, Validators.email]);
        password = new FormControl('', [Validators.required, CustomValidationsDirective.validatePassword]);
        userInfo = undefined;
        registerSuccess = undefined;

    emailValidationErrors() {
        return this.emailaddress.hasError('required') ? 'Enter an email address' : this.emailaddress.hasError('email') ? 'Enter a valid email address' : '';
    }

    passwordValidationErrors() {
        return this.password.hasError('required') ? 'Enter a password' : this.password.hasError('validatePassword') ? 'Password must contain atleast one lowecase letter, atleast one upper case letter and atleast one number' : '';
    }

    registerUser() {
        if (this.emailaddress.hasError('required') || this.emailaddress.hasError('email')) {
            this.errorMessage = this.emailValidationErrors();
            this.registerSuccess = undefined;
            if (this.password.hasError('required') || this.password.hasError('validatePassword')) {
                if (this.errorMessage) {
                    this.errorMessage.concat(' ;').concat(this.passwordValidationErrors());
                } else {
                    this.errorMessage = this.passwordValidationErrors();
                }
                this.registerSuccess = undefined;
            }
        } else {
            this.errorMessage = undefined;
            console.log(this.emailaddress.value);
            console.log(this.emailaddress.value);
            const observable: Observable<any> = this.service.registerService({
                username: this.emailaddress.value,
                password: this.password.value
            });
            observable.subscribe((data: any) => {
                this.errorMessage = undefined;
                this.registerSuccess = `Registration Successful! Login to explore`;
                this.userInfo = data.user.userInfo;
            }, error => {
                    this.registerSuccess = undefined;
                    this.errorMessage = error.error.message;
            });
        }
    }

    navigateToLogin() {
        this.routerService.routeToLogin();
    }

    ngOnInit() {}
}