import { RouterService } from './../services/router.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})

export class LogoutComponent {
    constructor(private authService: AuthenticationService, private routerService: RouterService) {}

    logout() {
        this.authService.deleteBearerToken();
        this.routerService.routeToLogin();
    }
}