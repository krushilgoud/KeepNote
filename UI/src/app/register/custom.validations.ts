import { Validators, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[app-custom-validator][ngModel]',
    providers: [{provide: NG_VALIDATORS, useValue: CustomValidationsDirective, multi: true}]
})
export class CustomValidationsDirective extends Validators {

    static password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,12}$/;

    static validatePassword(control: FormControl): {[key: string]: any} {
        const isMatch = control.value.match(CustomValidationsDirective.password_regex);
        return isMatch ? {'custom': true} : null;
    }
}
