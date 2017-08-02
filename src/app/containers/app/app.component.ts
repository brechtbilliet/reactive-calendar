import { Component } from '@angular/core';
import { VIEW_MODE } from '../../constants';
import * as moment from 'moment';
import { Appointment } from '../../types/appointment.type';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import Moment = moment.Moment;
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
    selector: 'app-root',
    template: `
        <topbar
                (next)="onNext()"
                (previous)="onPrevious()"
                (setViewMode)="onSetViewMode($event)"
                (searchChanged)="onSearchChanged($event)">
        </topbar>
        <div [ngSwitch]="viewMode$|async">
            <day-view
                    *ngSwitchCase="VIEW_MODE.DAY"
                    [appointments]="filteredAppointments$|async"
                    [date]="currentDate$|async"
                    (removeAppointment)="onRemoveAppointment($event)"
                    (addAppointment)="onAddAppointment($event)"
                    (updateAppointment)="onUpdateAppointment($event)"
            >
            </day-view>
            <week-view
                    *ngSwitchCase="VIEW_MODE.WEEK"
                    [appointments]="filteredAppointments$|async"
                    [year]="currentYear$|async"
                    [week]="currentWeek$|async"
                    (removeAppointment)="onRemoveAppointment($event)"
                    (addAppointment)="onAddAppointment($event)"
                    (updateAppointment)="onUpdateAppointment($event)"
            >
            </week-view>
            <month-view
                    *ngSwitchCase="VIEW_MODE.MONTH"
                    [month]="currentMonth$|async"
                    [year]="currentYear$|async"
                    [appointments]="filteredAppointments$|async"
                    (removeAppointment)="onRemoveAppointment($event)"
                    (addAppointment)="onAddAppointment($event)"
                    (updateAppointment)="onUpdateAppointment($event)"
            >
            </month-view>
        </div>
    `,
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    VIEW_MODE = VIEW_MODE;
    viewMode$ = new BehaviorSubject(VIEW_MODE.MONTH);
    // 0--------(+1)----(+1)----(-1)-------------...
    navigation$ = new BehaviorSubject<number>(0);
    searchTerm$ = new BehaviorSubject('');

    // -----MONTH---------------------YEAR------...
    // -----MONTH-------------------------------...
    // -----(d)---------------------------------...
    // --------(+1)----(+1)----(-1)-------------...
    // -----d---d-------d-------d-----d----------...

    private currentDateM$ = this.viewMode$.flatMap((viewMode: string) => {
        let dateM = moment();
        return this.navigation$
            .map((action: number) => {
                switch (viewMode) {
                    case VIEW_MODE.MONTH:
                        return dateM.startOf('month').add(action, 'months');
                    case VIEW_MODE.WEEK:
                        return dateM.startOf('week').add(action, 'weeks');
                    case VIEW_MODE.DAY:
                        return dateM.startOf('day').add(action, 'days');
                }
                return dateM;
            })
    }).shareReplay();

    currentDate$ = this.currentDateM$.map(dateM => dateM.toDate());
    currentYear$ = this.currentDateM$.map(dateM => dateM.year());
    currentMonth$ = this.currentDateM$.map(dateM => dateM.month());
    currentWeek$ = this.currentDateM$.map(dateM => dateM.week());
    appointments$ = this.db.list('/appointments');
    filteredAppointments$ = Observable.combineLatest([this.viewMode$, this.currentDateM$, this.appointments$, this.searchTerm$],
        (viewMode: string, currentDateM: Moment, appointments: Array<Appointment>, searchTerm: string) => {
            switch (viewMode) {
                case VIEW_MODE.MONTH:
                    return appointments
                        .filter(item => moment(item.date).format('MM/YYYY') === currentDateM.format('MM/YYYY'))
                        .filter(item => this.filterByTerm(item, searchTerm));
                case VIEW_MODE.WEEK:
                    return appointments
                        .filter(item => moment(item.date).format('ww/YYYY') === currentDateM.format('ww/YYYY'))
                        .filter(item => this.filterByTerm(item, searchTerm));
                case VIEW_MODE.DAY:
                    return appointments
                        .filter(item => moment(item.date).format('DD/MM/YYYY') === currentDateM.format('DD/MM/YYYY'))
                        .filter(item => this.filterByTerm(item, searchTerm));

            }
        }).shareReplay();

    constructor(private db: AngularFireDatabase) {
    }

    private filterByTerm(appointment: Appointment, term: string): boolean {
        return appointment.description.toLowerCase().indexOf(term.toLowerCase()) > -1;
    }

    onSetViewMode(viewMode: string): void {
        this.viewMode$.next(viewMode);
    }

    onPrevious(): void {
        this.navigation$.next(-1);
    }

    onNext(): void {
        this.navigation$.next(1);
    }

    onSearchChanged(e: string): void {
        this.searchTerm$.next(e);
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
