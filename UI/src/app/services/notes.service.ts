import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { isNgTemplate } from '../../../node_modules/@angular/compiler';
import { iterateListLike } from '../../../node_modules/@angular/core/src/change_detection/change_detection_util';

@Injectable()
export class NotesService {
  notes: Array<Note>;
  reminder: Array<string>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.notes = [];
    this.reminder = [];
    this.notesSubject = new BehaviorSubject([]);
  }

  subscriber = {
    next: data => {
      this.notes = data;
      this.notesSubject.next(this.notes);
    },
    error: error => {}
  };

  noteSubscriber = {
    next: data => {
      //console.log(data);
      this.notes = data;
      this.notesSubject.next(this.notes);
      data.forEach((item, index) => {
          if(item.sharedBy !== "self-notes") {
            alert("You have a shared note from "+item.sharedBy);
          }
          if(new Date(item.reminder).valueOf() > new Date().valueOf()+19769210 && new Date(item.reminder).valueOf() !== new Date(this.reminder[2]).valueOf()) {
            this.reminder[0] = item.id;
            this.reminder[1] = item.title;
            this.reminder[2] = item.reminder;
            var reminderDateTime = new Date(this.reminder[2]);
            //console.log("Reminder DateTime :: "+reminderDateTime.toISOString() +" - "+ reminderDateTime.valueOf());
            //console.log("System DateTime :: "+new Date().toISOString() +" - "+ new Date().valueOf());
            this.executeReminder(reminderDateTime.toISOString(), item.title);
          }
      });
    },
    error: error => {
      console.log(error);
    }
  };

  fetchAllNotes(userId) {
    this.httpClient.get<Array<Note>>(
      `http://localhost:8300/api/v1/notes?userId=${userId}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(this.noteSubscriber);
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  executeReminder(reminderDateTime, noteTitle) {
    let url = `http://lucy-krushilgoud.c9users.io/remind/${reminderDateTime}/${noteTitle}`
    //console.log("Hitting reminders API :: "+url);
    console.log("Reminder set");
    return this.httpClient.get(url);
  }

  addNote(note: Note, userId: string): Observable<Note> {
    console.log("inside addNote ... hitting create note API ...");
    return this.httpClient.post<Note>(
      `http://localhost:8300/api/v1/notes?userId=${userId}`, note, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(data => {
      this.notes.push(note);
      this.notesSubject.next(this.notes);
    });
  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(`http://localhost:8300/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(editedNote => {
      const index = this.notes.findIndex(item => item.id === note.id);
      if (index > -1) {
        this.notes[index] = editedNote;
      }
      this.notesSubject.next(this.notes);
    });
  }

  deleteNote(noteId: string): Observable<Note> {
    return this.httpClient.delete<Note>(
      `http://localhost:8300/api/v1/notes?noteId=${noteId}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      });
  }

  getFavoriteNotes(userId) {
    this.httpClient.get<Array<Note>>(
      `http://localhost:8300/api/v1/notes/favorites?userId=${userId}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      }).subscribe(this.subscriber);
  }

  getSharedNotes(userId) {
    this.httpClient.get<Array<Note>>(
      `http://localhost:8300/api/v1/notes/shared?userId=${userId}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      }).subscribe(this.subscriber);
  }

  filterNotes(userId, category) {
    this.httpClient.get<Array<Note>>(
      `http://localhost:8300/api/v1/notes/group?userId=${userId}&category=${category}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      }).subscribe(this.subscriber);
  }

  shareNote(recipientId: string, note: Note): Observable<any> {
    console.log("inside shareNote ... hitting share note API ...");
    return this.httpClient.post<Note>(
      `http://localhost:8300/api/v1/notes/share?recipientId=${recipientId}`, note, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  searchNotesByTitle(userId, noteTitle) {
    this.httpClient.get<Array<Note>>(
      `http://localhost:8300/api/v1/notes/search?userId=${userId}&title=${noteTitle}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      }).subscribe(this.subscriber);
  }

  getNoteById(noteId): Note {
    const note = this.notes.find(item => item.id === parseInt(noteId, 10));
    return Object.assign({}, note);
  }

  manageNotes(id: Number, update: any): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:8300/api/v1/notes/manage/${id}`, {favourite: update.favourite}, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      }).do(status => {
      if (status.message ===  'Update successful') {
        const index = this.notes.findIndex(item => item.id === id);
        if (index > -1) {
          const _note = this.notes[index];
          _note.favourite = update.favourite;
          this.notes[index] = _note;
          this.notesSubject.next(this.notes);
        }
      }
    });
  }
}