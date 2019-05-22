import { AuthenticationService } from './../services/authentication.service';
import { RouterService } from './../services/router.service';
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNoteView = true;
  isLoggedin=false;

  constructor(private routerService: RouterService,
    private authenticationService: AuthenticationService) {
  }
  switchToListView() {
    this.routerService.routeToListView();
    this.isNoteView = false;
  }
  switchToNoteView() {
    this.routerService.routeToNoteView();
    this.isNoteView = true;
  }
  logout() {
      this.authenticationService.deleteBearerToken();
      this.routerService.routeToLogin();
  }
  checkUserLogin() {
    this.authenticationService.isUserAuthenticated()
      .then(result => {
        return result;
      })
      .catch(error => {
        return false;
      });
  }

  ngOnInit() {
  }
}
