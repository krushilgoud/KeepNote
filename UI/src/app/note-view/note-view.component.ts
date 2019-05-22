import { NotesService } from './../services/notes.service';
import { Note } from './../note';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  notes: Array<Note>;
  constructor(private notesService: NotesService) {
    this.notes = new Array<Note>();
  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      error => {}
    );
  }
}
