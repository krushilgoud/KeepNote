import { AuthenticationService } from './../services/authentication.service';
import { NotesService } from './../services/notes.service';
import { Note } from './../note';
import { Component, OnInit } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
    errMessage = '';

    addNoteObserver = {
        next: data => this.note = new Note(),
        error: error => {
            if (error.status === 404) {
                this.errMessage = error.message;
            } else {
                this.errMessage = error.error.message;
            }
        }
    };

    constructor(private notesService: NotesService, private authenticationService: AuthenticationService) {
        this.note = new Note();
    }

    public note: Note;

    takeNotes() {
        console.log("inside takeNotes ...");
        if (this.note.text === '' || this.note.title === '') {
            this.errMessage = 'Title and Text both are required fields';
        } else {
            let details: any;
            this.authenticationService.getUserDetails().subscribe(_details => {
                console.log("after getUserDetails ...");
                if(this.note.state === null || this.note.state === undefined || this.note.state === '') {
                    this.note.state = 'not-started';
                }
                this.notesService.addNote(this.note, _details['userId']).subscribe(this.addNoteObserver);
            }, error => {
                console.log(error);
                this.errMessage = error.message;
            });
        }
    }
    ngOnInit() {}
}
