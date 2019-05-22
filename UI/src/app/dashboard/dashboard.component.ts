import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from './../services/authentication.service';
import { NotesService } from './../services/notes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private notesService: NotesService, private authenticationService: AuthenticationService, private routerService: RouterService, private notifier: NotifierService) {
    console.log("Inside UI dashboard...");
    if (this.authenticationService.getBearerToken()) {
      console.log("Valid token... Verifying User...");
      this.authenticationService.verifyUser().subscribe(result => {
        console.log("User verified...");
        this.notesService.fetchAllNotes(result['userId']);
      });
    } else {
      this.routerService.routeToLogin();
    }
  }

  ngOnInit() {
  }

}
