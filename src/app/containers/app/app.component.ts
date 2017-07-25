import { Component } from '@angular/core';
import { VIEW_MODE } from '../../constants';
import * as moment from 'moment';
import { Appointment } from '../../types/appointment.type';
import { AngularFireDatabase } from 'angularfire2/database';
import Moment = moment.Moment;


@Component({
    selector: 'app-root',
    template: `
        <topbar
                (next)="onNext()"
                (previous)="onPrevious()"
                (setViewMode)="onSetViewMode($event)"
                (searchChanged)="onSearchChanged($event)">
        </topbar>
        <div [ngSwitch]="VIEW_MODE.MONTH" class="main">
            <day-view
                    *ngSwitchCase="VIEW_MODE.DAY"
                    [appointments]="[]"
                    [date]="null"
                    (removeAppointment)="onRemoveAppointment($event)"
                    (addAppointment)="onAddAppointment($event)"
                    (updateAppointment)="onUpdateAppointment($event)">
            </day-view>
            <week-view
                    *ngSwitchCase="VIEW_MODE.WEEK"
                    [appointments]="[]"
                    [year]="2017"
                    [week]="08"
                    (removeAppointment)="onRemoveAppointment($event)"
                    (addAppointment)="onAddAppointment($event)"
                    (updateAppointment)="onUpdateAppointment($event)">
            </week-view>
            <month-view
                    *ngSwitchCase="VIEW_MODE.MONTH"
                    [month]="08"
                    [year]="2017"
                    [appointments]="[]"
                    (removeAppointment)="onRemoveAppointment($event)"
                    (addAppointment)="onAddAppointment($event)"
                    (updateAppointment)="onUpdateAppointment($event)">
            </month-view>
        </div>
    `,
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    VIEW_MODE = VIEW_MODE;
    appointments$ = this.db.list('/appointments');

    constructor(private db: AngularFireDatabase) {
    }

    private filterByTerm(appointment: Appointment, term: string): boolean {
        return appointment.description.toLowerCase().indexOf(term.toLowerCase()) > -1;
    }

    onSetViewMode(viewMode: string): void {
        // todo
    }

    onPrevious(): void {
        // todo
    }

    onNext(): void {
        // todo
    }

    onSearchChanged(e: string): void {
        // todo
    }

    onRemoveAppointment(id: string): void {
        this.appointments$.remove(id);
    }

    onAddAppointment(date: Date): void {
        this.appointments$.push(new Appointment(date.toDateString(), ''));
    }

    onUpdateAppointment(appointment: Appointment): void {
        this.db.object('appointments/' + appointment.$key).set({
            description: appointment.description,
            date: appointment.date
        });
    }
}
