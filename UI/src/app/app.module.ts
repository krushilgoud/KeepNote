import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomValidationsDirective } from './register/custom.validations';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NotesService } from './services/notes.service';
import { AppComponent } from './app.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteComponent } from './note/note.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { RouterModule, Route, CanActivate } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './services/register.service';
import { MatGridListModule } from '@angular/material';
import { NotifierModule } from 'angular-notifier';

const appRoutes = [
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'logout',
      component: LogoutComponent
    },
    {
      path: 'search',
      component: SearchComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [CanActivateRouteGuard],
      children: [
        {
          path: 'view/noteview',
          component: NoteViewComponent
        },
        {
          path: 'view/listview',
          component: ListViewComponent
        },
        {
          path: 'note/:noteId/edit',
          component: EditNoteOpenerComponent,
          outlet: 'noteEditOutlet'
        },
        {
          path: '',
          redirectTo: 'view/noteview',
          pathMatch: 'full'
        },
        {
          path: 'logout',
          component: LogoutComponent
        },
        {
          path: 'search',
          component: SearchComponent
        }
      ]
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    HeaderComponent,
    ListViewComponent,
    LoginComponent,
    LogoutComponent,
    SearchComponent,
    NoteTakerComponent,
    NoteViewComponent,
    NoteComponent,
    RegisterComponent,
    CustomValidationsDirective
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
    MatExpansionModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    NotifierModule.withConfig({
      /**
      * Defines the notification theme, responsible for the Visual Design of notifications
      * @type {string} 
      */
      theme: 'material',
      position: {
        horizontal: {
          /**
           * Defines the horizontal position on the screen
           * @type {'left' | 'middle' | 'right'}
           */
          position: 'left',
          /**
           * Defines the horizontal distance to the screen edge (in px)
           * @type {number} 
           */
          distance: 12
        },
        vertical: {
          /**
           * Defines the vertical position on the screen
           * @type {'top' | 'bottom'}
           */
          position: 'bottom',
          /**
           * Defines the vertical distance to the screen edge (in px)
           * @type {number} 
           */
          distance: 12,
          /**
           * Defines the vertical gap, existing between multiple notifications (in px)
           * @type {number} 
           */
          gap: 10
        }
      },
      behaviour: {
        /**
         * Defines whether each notification will hide itself automatically after a timeout passes
         * @type {number | false}
         */
        autoHide: 5000,
        /**
         * Defines what happens when someone clicks on a notification
         * @type {'hide' | false}
         */
        onClick: false,
        /**
         * Defines what happens when someone hovers over a notification
         * @type {'pauseAutoHide' | 'resetAutoHide' | false}
         */
        onMouseover: 'pauseAutoHide',
        /**
         * Defines whether the dismiss button is visible or not
         * @type {boolean} 
         */
        showDismissButton: true,
        /**
         * Defines whether multiple notification will be stacked, and how high the stack limit is
         * @type {number | false}
         */
        stacking: 4
      }
    })
  ],
  providers: [
    AuthenticationService,
    RouterService,
    NotesService,
    RegisterService,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditNoteViewComponent
  ]
})

export class AppModule { }
