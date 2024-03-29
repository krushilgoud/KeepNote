import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  constructor(private notesService: NotesService) {
    this.notStartedNotes = new Array<Note>();
    this.startedNotes = new Array<Note>();
    this.completedNotes = new Array<Note>();
  }
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  ngOnInit() {
    this.notesService.getNotes()
    .subscribe(data => {
      data.map(note => {
        if (note.state === 'started') {
          this.startedNotes.push(note);
        } if (note.state === 'not-started') {
          this.notStartedNotes.push(note);
        } if (note.state === 'completed') {
          this.completedNotes.push(note);
        }
      });
    });
  }
}
