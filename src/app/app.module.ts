import 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdToolbarModule,
    MdTooltipModule
} from '@angular/material';
import { AppComponent } from './containers/app/app.component';
import { DayViewComponent } from './components/day-view/day-view.component';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { MonthViewComponent } from './components/month-view/month-view.component';
import { DayDetailComponent } from './components/day-detail/day-detail.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// replace this config here with the one from firebase
export const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
};

@NgModule({
    declarations: [
        AppComponent,
        DayViewComponent,
        WeekViewComponent,
        MonthViewComponent,
        DayDetailComponent,
        TopbarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MdCardModule,
        MdButtonModule,
        MdInputModule,
        MdTooltipModule,
        MdToolbarModule,
        MdIconModule,
        AngularFireModule.initializeApp(firebaseConfig, 'reactive-calendar'),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
