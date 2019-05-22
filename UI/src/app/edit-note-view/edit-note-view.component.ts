import { RouterService } from './../services/router.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})

export class EditNoteViewComponent implements OnInit, OnDestroy {

  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  groups: Array<string> = ['Food', 'Travel', 'Meetings', 'Groceries', 'Payments', 'Others'];
  accessTypes: Array<string> = ['full-access', 'read-only'];
  recipient: string;
  errMessage: string;
  reminder: Date;
  favourite: boolean;
  errorMessage: string;
  checked: boolean;

  subscriber = {
    next: (data) => {
      this.dialogRef.close();
    },
    error: (error) => {
      if (error.status === 404) {
        this.errMessage = error.message;
      } else {
        this.errMessage = error.error.message;
      }
    }
  };

  constructor(private authenticationService: AuthenticationService, private dialogRef: MatDialogRef<EditNoteViewComponent>, @Inject(MAT_DIALOG_DATA) private noteIdRaw: any, private notesService: NotesService, private routerService: RouterService) {
    this.favourite = false;
    this.errorMessage = '';
  }

  toggleFavouriteNotes() {
    let update: any;
    if(this.note.favourite === 'yes') {
      update = {favourite: 'no'};
    } else {
      update = {favourite: 'yes'};
    }
    this.notesService.manageNotes(this.note.id, update).subscribe(this.subscriber);
  }

  shareNote() {
    this.authenticationService.getUserDetails().subscribe(userDetails => {
      this.note.sharedBy = userDetails['username'];
      console.log("Shared by :: "+this.note.sharedBy);
      console.log("Shared to :: "+this.recipient);
      this.authenticationService.findUserByUsername(this.recipient).subscribe(recipientDetails => {
        console.log("recipientDetails :: "+recipientDetails);
        this.notesService.shareNote(recipientDetails['userId'], this.note).subscribe(this.subscriber);
      })
    });
  }

  onSave() {
    this.notesService.editNote(this.note).subscribe(this.subscriber);
  }

  onDelete() {
    this.notesService.deleteNote(this.noteIdRaw.id).subscribe(this.subscriber);
  }

  ngOnInit() {
    this.note = this.notesService.getNoteById(parseInt(this.noteIdRaw.id, 10));
    if (this.note.favourite === 'yes') {
      this.favourite = true;
    } else {
      this.favourite = false;
    }
  }

  ngOnDestroy() {
    this.routerService.routeBack();
  }
}
