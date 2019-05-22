import { RouterService } from './../services/router.service';
import { EditNoteViewComponent } from './../edit-note-view/edit-note-view.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  id: number;
  constructor(
    private dialog: MatDialog
  , private activatedRoute: ActivatedRoute
  , private routerService: RouterService) {
   this.activatedRoute.paramMap.subscribe(params => {
    this.id = parseInt(params.get('noteId'), 10);
   });
   this.dialog.open(EditNoteViewComponent, {
     data: {'id': this.id}
   })
   .afterClosed().subscribe(result => {
    routerService.routeBack();
   });
  }

  ngOnInit() {}
}
