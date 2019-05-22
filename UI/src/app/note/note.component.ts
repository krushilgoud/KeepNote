import { RouterService } from './../services/router.service';
import { Note } from './../note';
import { NotesService } from './../services/notes.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(private routerService: RouterService) {}

 @Input()
 public note: Note;

 openEditNoteView() {
  this.routerService.routeToEditNoteView(this.note.id);
 }
 
 ngOnInit() {}
}
