import { AuthenticationService } from './../services/authentication.service';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Note } from '../note';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {
    
    notes: Array<Note>;
    searchtext;
    groups: Array<string> = ['', 'Food', 'Travel', 'Meetings', 'Groceries', 'Payments', 'Others'];
    errorMessage: string;
    searchResults: boolean;

    subscriber = {
        next: notes => {
          this.searchResults = true;
          this.notes = notes;
        },
        error: error => {
          this.searchResults = false;
          this.errorMessage = error.message;
        }
      };
    
    constructor(private authenticationService: AuthenticationService, private notesService: NotesService, private routerService: RouterService) {
        this.searchtext = new FormControl('', Validators.required);
        this.notes = new Array<Note>();
        this.errorMessage = '';
        this.searchResults = false;
    }

    searchNotes() {
        //console.log(this.searchtext.value);
        this.authenticationService.getUserDetails().subscribe(userDetails => {
            console.log("Fetched userDeatils - Searching for notes...");
            this.notesService.searchNotesByTitle(userDetails['userId'], this.searchtext.value);
        });
    }

    fetchAllNotes() {
        this.authenticationService.getUserDetails().subscribe(userDetails => {
            console.log("Clearing search results...");
            this.notesService.fetchAllNotes(userDetails['userId']);
        });
    }

    getFavoriteNotes() {
        this.authenticationService.getUserDetails().subscribe(userDetails => {
            console.log("Getting favorites...");
            this.notesService.getFavoriteNotes(userDetails['userId']);
        });
    }

    getSharedNotes() {
        this.authenticationService.getUserDetails().subscribe(userDetails => {
            console.log("Getting shared notes...");
            this.notesService.getSharedNotes(userDetails['userId']);
        });
    }

    filterNotes(data) {
        this.authenticationService.getUserDetails().subscribe(userDetails => {
            console.log("Filtering notes per category...");
            console.log(data);
            this.notesService.filterNotes(userDetails['userId'], data);
        });
    }
}