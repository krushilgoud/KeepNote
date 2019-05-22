import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class RouterService {

  constructor(private router: Router,
    private location: Location) {}

    routeToRegister() {
      this.router.navigate(['register']);
    }
  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  routeToEditNoteView(noteId) {
    this.router.navigate(['dashboard', {
      outlets: {
        noteEditOutlet: ['note', noteId, 'edit']
      }
    }]);
  }

  routeBack() {
    this.location.back();
  }

  routeToNoteView() {
    this.router.navigate(['dashboard/view/noteview']);
  }

  routeToListView() {
    this.router.navigate(['dashboard/view/listview']);
  }
}
